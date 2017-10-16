import Request from 'request';
import Q from 'q';

const { DIGITALOCEAN_API_URL, IP_API_SERVICE_URL, API_TOKEN } = process.env;

export const updateDomainRecord = (domainName, recordId, ipAddress) => {
  const deferred = Q.defer();
  const options = {
    uri: `${DIGITALOCEAN_API_URL}/domains/${domainName}/records/${recordId}`,
    json: {
      data: ipAddress,
    },
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  Request.put(options, (error, response, body) => {
    if (!error && !!response.statusCode && response.statusCode === 200) {
      console.log('Update Ip Address to', response.body.domain_record.data);
      deferred.resolve(response.body);
    } else if (error) {
      deferred.reject(error);
    } else {
      deferred.reject(new Error(body.message));
    }
  });
  return deferred.promise;
};

export const getCurrentIpAddress = () => {
  const deferred = Q.defer();
  const options = {
    uri: IP_API_SERVICE_URL,
  };

  Request.get(options, (error, response, body) => {
    if (!error && !!response.statusCode && response.statusCode === 200) {
      deferred.resolve(JSON.parse(response.body).ip);
    } else if (error) {
      deferred.reject(error);
    } else {
      deferred.reject(new Error(body.message));
    }
  });

  return deferred.promise;
};

export const getDomainRecord = (domainName, recordId) => {
  const deferred = Q.defer();
  const options = {
    uri: `${DIGITALOCEAN_API_URL}/domains/${domainName}/records/${recordId}`,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  };

  Request.get(options, (error, response, body) => {
    if (!error && !!response.statusCode && response.statusCode === 200) {
      console.log(`Record: ${JSON.parse(response.body).domain_record}`);
      deferred.resolve(JSON.parse(response.body));
    } else if (error) {
      deferred.reject(error);
    } else {
      deferred.reject(new Error(body.message));
    }
  });
  return deferred.promise;
};
