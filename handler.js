'use strict';

module.exports.hello = (event, context, callback) =>  {
  const response = {
    statusCode: 200,
    body: 'Hello there',
    headers: { 'Content-Type': 'text/plain' }
  }

  callback(null,response);
};
