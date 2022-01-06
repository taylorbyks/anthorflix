FROM node:lts

COPY . .

WORKDIR /

RUN npm i

RUN npm run build

CMD ["npm", "run", "start"]
