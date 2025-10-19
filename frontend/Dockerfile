FROM node:24-alpine

WORKDIR /app

COPY package-lock.json package.json /app/

RUN npm install

COPY . . 

EXPOSE 3000

CMD ["npm", "run", "dev"]
