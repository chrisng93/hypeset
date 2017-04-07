# Use current version of node
FROM node:latest

MAINTAINER Chris Ng, chris.ng93@gmail.com

# Create app directory
RUN mkdir /usr/src/hypeset-backend
WORKDIR /usr/src/hypeset-backend

# Install dependencies
COPY package.json /usr/src/hypeset-backend
RUN npm install

# Bundle app source
COPY . /usr/src/hypeset-backend

# Expose port
EXPOSE 8000

CMD npm start
