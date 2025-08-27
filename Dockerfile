FROM node:current-alpine3.22

WORKDIR /app

COPY package*.json /app

RUN npm install
RUN npm install dotenv

COPY . .

EXPOSE 8080

CMD ["node", "src/index.js"]