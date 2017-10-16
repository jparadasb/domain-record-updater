import Q from 'q';
import Log from '../models/Log';

export const getLastLog = () => {
  const deferred = Q.defer();
  Log.findOne(
    {},
    {},
    { sort: { created_at: -1 } },
    (err, log) => (err ? deferred.reject(err) : deferred.resolve(log)),
  );
  return deferred.promise;
};

export const getFirstLog = () => {
  const deferred = Q.defer();
  Log.findOne(
    {},
    {},
    { sort: { created_at: 1 } },
    (err, log) => (err ? deferred.reject(err) : deferred.resolve(log)),
  );
  return deferred.promise;
};

export const create = (data) => {
  const deferred = Q.defer();

  Log.create({
    ip: data.ip,
  })
    .then(deferred.resolve, deferred.reject);

  return deferred.promise;
};
