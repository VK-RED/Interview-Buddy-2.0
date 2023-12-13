# FROM mhart/alpine-node
FROM node:18-alpine

WORKDIR /usr/src/app
 
# Copy root package.json and lockfile
COPY package.json ./
COPY package-lock.json ./
 
# Copy the docs package.json
COPY apps/next-app/package.json ./apps/next-app/package.json

RUN npm install
 
# Copy app source
COPY . .

RUN npx prisma generate --schema=packages/db/prisma/schema.prisma
 
EXPOSE 3000
 
CMD ["npm","run","dev"]