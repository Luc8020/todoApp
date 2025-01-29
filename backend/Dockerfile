FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN chown -R node:node .

USER node

RUN npm install

COPY --chown=node:node src/ ./src/

EXPOSE 8080

CMD [ "npm", "start" ]