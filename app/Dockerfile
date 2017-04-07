FROM node:latest

MAINTAINER Chris Ng, chris.ng93@gmail.com

RUN npm install webpack -g

RUN mkdir -p /usr/src/hypeset-frontend
WORKDIR /usr/src/hypeset-frontend

COPY package.json /usr/src/hypeset-frontend
RUN npm install

COPY . /usr/src/hypeset-frontend/

EXPOSE 8888

RUN webpack -p --config webpack.production.config.js --progress --profile --colors
CMD npm start
