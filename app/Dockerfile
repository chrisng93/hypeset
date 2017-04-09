# Use current version of node
FROM node:latest

MAINTAINER Chris Ng, chris.ng93@gmail.com

RUN npm install webpack -g

# Create app directory
RUN mkdir -p /usr/src/hypeset-frontend
WORKDIR /usr/src/hypeset-frontend

# Install dependencies
COPY package.json /usr/src/hypeset-frontend
RUN npm install

# Bundle app source
COPY . /usr/src/hypeset-frontend/

# Expose port
EXPOSE 8888

# Build and run app
RUN webpack -p --config webpack.production.config.js --progress --profile --colors
CMD npm start
