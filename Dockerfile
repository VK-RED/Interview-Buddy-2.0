# FROM mhart/alpine-node
FROM node:18-alpine

WORKDIR /usr/src/app

COPY package* .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","run","dev"]