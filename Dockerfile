FROM node:latest
LABEL application="canechair_framework_api"
WORKDIR /app
COPY package.json /app
RUN npm install
COPY testServer.js /app
CMD node testServer.js
EXPOSE 8139