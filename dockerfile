FROM node:16.14.0-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# Install app dependencies
COPY package.json ./

# update and install dependency
RUN apk update && apk upgrade
RUN npm install

CMD [ "npm", "run", "dev" ]

EXPOSE 3000