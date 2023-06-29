FROM node:18.12.0-buster-slim

WORKDIR /app
COPY . .

EXPOSE 3000

RUN npm install

ENTRYPOINT ["npm", "start"]
