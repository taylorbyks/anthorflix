FROM node:lts

RUN apt-get -qy update && apt-get -qy install openssl

COPY . .

WORKDIR /

RUN npm i

EXPOSE 3000

ENV DB_HOST=postgres

CMD ["npm", "run", "build"]
