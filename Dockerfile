FROM node:18.12.0-buster-slim
WORKDIR /app

COPY . .
RUN npm install

EXPOSE 3000
ENTRYPOINT ["npm", "start"]
