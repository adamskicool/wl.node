FROM node:10

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ormconfig.json ./dist/
COPY .env ./dist/

WORKDIR /usr/app/dist
CMD node src/index.js