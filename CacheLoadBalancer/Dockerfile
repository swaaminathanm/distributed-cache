FROM node:15
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8081
EXPOSE $PORT
CMD [ "node", "index.js" ]