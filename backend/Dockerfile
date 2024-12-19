FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig.json ./
COPY src/ src/
COPY wild.sqlite ./

CMD ["npm", "start"]