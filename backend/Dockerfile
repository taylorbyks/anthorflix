FROM node:lts as base

RUN apt-get -qy update && apt-get -qy install openssl

COPY . .

WORKDIR /

RUN npm i

ENV DB_HOST=postgres