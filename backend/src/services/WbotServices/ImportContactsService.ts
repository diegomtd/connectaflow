import * as Sentry from "@sentry/node";
import GetDefaultWhatsApp from "../../helpers/GetDefaultWhatsApp";
import { getWbot } from "../../libs/wbot";
import Contact from "../../models/Contact";
import logger from "../../utils/logger";
import ShowBaileysService from "../BaileysServices/ShowBaileysService";
import CreateContactService from "../ContactServices/CreateContactService";
import { isString, isArray } from "lodash";
import path from "path";
import fs from "fs";

const ImportContactsService = async (companyId?: number, whatsappId?: number): Promise<void> => {
  const defaultWhatsapp = await GetDefaultWhatsApp(whatsappId, companyId);
  const wbot = getWbot(defaultWhatsapp.id);

  let phoneContacts;
  const publicFolder = path.resolve(__dirname, "..", "..", "..", "public");
  const beforeFilePath = path.join(publicFolder, `company${companyId}`, "contatos_antes.txt");
  const afterFilePath = path.join(publicFolder, `company${companyId}`, "contatos_depois.txt");

  try {
    const contactsString = await ShowBaileysService(wbot.id);
    phoneContacts = JSON.parse(JSON.stringify(contactsString.contacts));
    try {
      await fs.promises.writeFile(
        beforeFilePath,
        JSON.stringify(phoneContacts, null, 2)
      );
    } catch (error) {
      logger.error(`Failed to write contacts before import: ${error}`);
      return;
    }

  } catch (err) {
    Sentry.captureException(err);
    logger.error(`Could not get whatsapp contacts from phone. Err: ${err}`);
  }

  try {
    await fs.promises.writeFile(
      afterFilePath,
      JSON.stringify(phoneContacts, null, 2)
    );
  } catch (error) {
    logger.error(`Failed to write contacts after import: ${error}`);
    return;
  }

  const phoneContactsList = isString(phoneContacts)
    ? JSON.parse(phoneContacts)
    : phoneContacts;

  if (isArray(phoneContactsList)) {
    phoneContactsList.forEach(async ({ id, name, notify }) => {
      if (id === "status@broadcast" || id.includes("g.us")) return;
      const number = id.replace(/\D/g, "");

      const existingContact = await Contact.findOne({
        where: { number, companyId }
      });

      if (existingContact) {
        // Atualiza o nome do contato existente
        existingContact.name = name || notify;
        await existingContact.save();
      } else {
        // Criar um novo contato
        try {
          await CreateContactService({
            number,
            name: name || notify,
            companyId
          });
        } catch (error) {
          Sentry.captureException(error);
          logger.warn(
            `Could not get whatsapp contacts from phone. Err: ${error}`
          );
        }
      }
    });
  }
};

export default ImportContactsService;