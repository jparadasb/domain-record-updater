# App to save a log of ip addresses and change a DNS record with digitalocean API

This app is only for **educational propouse**.


To run this project we need setup the ecosystem.js file with the following ENV vars: 

        API_TOKEN: '', <- API TOKEN of DigitalOcean API
        MONGO_URI: '', <- Mongo database url
        RECORD_ID: '',
        DOMAIN: '',
        DIGITALOCEAN_API_URL: 'https://api.digitalocean.com/v2/',
        IP_API_SERVICE_URL: 'https://api.ipify.org?format=json'
        
After we defined this vars, we can run this project with

```bash
yarn install && yarn start-dev
```
