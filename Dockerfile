FROM mhart/alpine-node:8

RUN mkdir /app
WORKDIR /app

COPY . /app
RUN npm install

CMD ["npm", "start"]
