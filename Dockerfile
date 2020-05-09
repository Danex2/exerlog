FROM node:12-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./src/server .

EXPOSE 3000

CMD ["npm", "run", "dev:server"]