FROM node:lts

WORKDIR /docker-app

RUN npm install -g nodemon

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .
USER node
EXPOSE 3000

CMD ["node", "server.js"]