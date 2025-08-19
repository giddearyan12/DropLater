FROM node:18

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY server.js server.js
COPY redis.js redis.js

RUN npm install

COPY . .

CMD [ "node", "server.js" ]