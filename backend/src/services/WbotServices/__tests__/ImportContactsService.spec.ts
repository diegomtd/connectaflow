import fs from "fs";
import ImportContactsService from "../ImportContactsService";
import logger from "../../../utils/logger";

jest.mock("../../../helpers/GetDefaultWhatsApp", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({ id: 123 })
}));

jest.mock("../../../libs/wbot", () => ({
  getWbot: jest.fn().mockReturnValue({ id: 456 })
}));

jest.mock("../../BaileysServices/ShowBaileysService", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue({
    contacts: [
      { id: "123@s.whatsapp.net", name: "Test User", notify: "Test Notify" }
    ]
  })
}));

jest.mock("../../../models/Contact", () => ({
  __esModule: true,
  default: {
    findOne: jest.fn().mockResolvedValue(null)
  }
}));

jest.mock("../../ContactServices/CreateContactService", () => ({
  __esModule: true,
  default: jest.fn().mockResolvedValue(undefined)
}));

jest.mock("../../../utils/logger", () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    warn: jest.fn()
  }
}));

describe("ImportContactsService", () => {
  const writeFileSpy = jest.spyOn(fs.promises, "writeFile");
  const loggerErrorMock = logger.error as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    writeFileSpy.mockReset();
    writeFileSpy.mockResolvedValue(undefined);
  });

  afterAll(() => {
    writeFileSpy.mockRestore();
  });

  it("logs an error and aborts when it cannot write the before snapshot", async () => {
    writeFileSpy.mockRejectedValueOnce(new Error("EACCES"));

    await expect(ImportContactsService(1, 1)).resolves.toBeUndefined();

    expect(writeFileSpy).toHaveBeenCalledTimes(1);
    expect(loggerErrorMock).toHaveBeenCalledWith(
      expect.stringContaining("Failed to write contacts before import")
    );
  });

  it("logs an error and aborts when it cannot write the after snapshot", async () => {
    writeFileSpy.mockResolvedValueOnce(undefined);
    writeFileSpy.mockRejectedValueOnce(new Error("EACCES"));

    await expect(ImportContactsService(1, 1)).resolves.toBeUndefined();

    expect(writeFileSpy).toHaveBeenCalledTimes(2);
    expect(loggerErrorMock).toHaveBeenCalledWith(
      expect.stringContaining("Failed to write contacts after import")
    );
  });
});
