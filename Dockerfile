# Docker Image
FROM node:current-alpine3.16 AS appbuild

RUN apk add --no-cache tzdata && cp -r -f /usr/share/zoneinfo/Asia/Jakarta /etc/localtime
RUN apk add git

WORKDIR /home/node

# COPY ./package.json /home/node

# Required install
RUN npm install -g nodemon
RUN npm install -g express-generator
RUN express
RUN npm install
RUN npm update

# Start apps
CMD ["nodemon"]

#EXPOSE PORT
EXPOSE 3000