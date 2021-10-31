FROM node:13.12.0-alpine

WORKDIR /usr/src/index

COPY package*.json ./

RUN npm install && npm install typescript -g

COPY . .

EXPOSE 3000

CMD ["npm", "start"]