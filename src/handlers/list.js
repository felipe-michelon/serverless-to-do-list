'use strict';

const AWS = require('aws-sdk');

const databaseParams = {
  TableName: process.env.DYNAMODB_TABLE,
};

module.exports.list = (event, context, callback) => {
  const databaseConnection = event.databaseConnection || new AWS.DynamoDB.DocumentClient();

  databaseConnection.scan(databaseParams, (error, result) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: 'There was a problem retrieving the items',
      });
      return;
    }

    const response = {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(result.Items),
    };
    callback(null, response);
  });
};
