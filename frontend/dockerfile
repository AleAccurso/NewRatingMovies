FROM node:16.14.0-alpine

# install simple http server for serving static content
# RUN npm install -g http-server

# make the 'app' folder the current working directory
RUN mkdir -p /opt/frontend
WORKDIR /opt/frontend

# update and install dependency
RUN apk update && apk upgrade
RUN apk add --no-cache git

# Install app dependencies
COPY package.json ./
RUN npm install 
RUN npm run build

RUN chmod -R 777 /opt/frontend/node_modules/.cache

CMD [ "npm", "run", "start" ]

EXPOSE 3000