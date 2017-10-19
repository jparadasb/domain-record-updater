FROM node:8

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm install --silent

CMD ["npm", "start"]
