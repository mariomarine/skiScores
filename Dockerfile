FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
CMD node app.js
EXPOSE 8000
RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]
