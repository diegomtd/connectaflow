🖥️ Requisitos

🐧 Ubuntu 20.04 (obrigatório)
💻 VM com mínimo: 2 CPUs, 4GB de RAM
💻 VM recomendada: 4 CPUs, 6GB de RAM

🌐 Criar subdomínio e apontar para o IP da sua VPS
Frontend URL: app.seudominio.com (substitua pelo seu domínio)
Backend URL: api.seudominio.com

🌍 Checar propagação do domínio
Verifique a propagação do seu domínio aqui:
🔗 https://dnschecker.org/

🚀 Atualizar VPS antes de tudo
Antes de começar a instalação, atualize sua VPS com os seguintes comandos:

1️⃣ Atualizar pacotes
sudo apt update && sudo apt upgrade -y

2️⃣ Instalar software-properties-common
apt install software-properties-common

3️⃣ Instalar dependências necessárias
sudo apt-get install -y libgbm-dev wget unzip fontconfig locales gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils git

4️⃣ Instalar zip e unzip
sudo apt update && sudo apt install zip unzip -y

⚙️ Copiar a pasta 'whaticket_install' para root e rodar os comandos abaixo

1️⃣ Dar permissão de execução
sudo chmod +x ./whaticket_install/whaticketsaas

2️⃣ Ir para a pasta 'whaticket_install'
cd ./whaticket_install

3️⃣ Rodar o instalador
sudo ./whaticketsaas

🔑 Acesso ao sistema
Login: admin@admin.com
Senha: adminpro

📞 Suporte
Se precisar de ajuda, entre em contato conosco pelo telefone:
📱 +55 41 99823-9551