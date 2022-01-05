FROM node:16-alpine

COPY . .

WORKDIR /

RUN npm i

EXPOSE 3000

ENV DB_HOST=postgres

CMD ["npm", "run", "build"]
