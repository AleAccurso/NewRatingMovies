FROM node:16.12.0-alpine as frontend

RUN npm install -g npm@8.5.5
# install simple http server for serving static content
# RUN npm install -g http-server

# make the 'app' folder the current working directory
RUN mkdir -p /frontend
WORKDIR /frontend

# Install app dependencies
COPY package.json ./

# update and install dependency
RUN apk add --no-cache git

RUN npm install
RUN npm run build

# RUN chmod -R 777 /opt/frontend/node_modules/.cache

# Copy project
ADD . /frontend/
# COPY . .

CMD [ "npm", "run", "start" ]

EXPOSE 3000