FROM node:22.17.0

WORKDIR /app

ENV SRV_HOST=localhost
ENV SRV_PORT=3000

EXPOSE ${SRV_PORT}

COPY package*.json .
COPY ./src ./src
COPY .env .

RUN npm install
CMD ["npm", "start"]