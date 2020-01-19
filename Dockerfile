FROM node:10

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY ormconfig.json ./dist/
COPY .env ./dist/