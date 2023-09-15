# Stage 1 - Building image
FROM node:18.17.1-alpine

RUN mkdir /home/node/app/ && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY --chown=node:node package*.json ./

USER node

RUN npm install && npm cache clean --force --loglevel=error

COPY --chown=node:node . .

CMD [ "npm", "start"]