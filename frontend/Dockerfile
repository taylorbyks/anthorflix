FROM node:16-alpine

COPY . .

WORKDIR /

RUN npm i

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]
