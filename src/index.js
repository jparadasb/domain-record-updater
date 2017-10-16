import mongoose from 'mongoose';
import * as LogService from './services/LogService';
import * as DomainService from './services/DomainService';


const {
  INTERVAL_TIME, MONGO_URI, DOMAIN, RECORD_ID,
} = process.env;

const INTERVAL_MILLIS = (INTERVAL_TIME || 15) * 60000;

mongoose.connect(MONGO_URI);

mongoose.connection.on('connected', () => console.log('Mongoose connection open'));

mongoose.connection.on('error', err => console.log(`Mongoose connection error ${err}`));

mongoose.connection.on('disconnected', () => console.log('Mongoose disconnected'));

setInterval(() => {
  DomainService.getCurrentIpAddress()
    .then(ip => LogService.getLastLog()
      .then((lastLog) => {
        if (lastLog && lastLog.ip === ip) {
          console.log(lastLog.ip, ip, 'NOTHING TO DO');
        } else {
          return LogService.create({ ip })
            .then(() => DomainService.updateDomainRecord(DOMAIN, RECORD_ID, ip)
              .then(response => console.log(`Record ${response.domain_record.type} updated to data: ${response.domain_record.data}`)));
        }
      }))
    .catch(err => console.log(err));
}, INTERVAL_MILLIS);

