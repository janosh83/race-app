# Použij Node.js image z Docker Hubu
FROM node:20

# Nastav pracovní adresář v kontejneru
WORKDIR /app

# Zkopíruj package.json a nainstaluj závislosti
COPY package*.json ./
RUN npm install && npm cache clean --force
ENV PATH=/app/node_modules/.bin:$PATH

# Zkopíruj zbytek aplikace
COPY . .

# Exponuj port pro aplikaci
EXPOSE 3000

# Kopírování entrypoint skriptu a jeho zpřístupnění
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

# Použití entrypoint skriptu
#ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["sh", "-c", "npx sequelize-cli db:migrate && npm start"]