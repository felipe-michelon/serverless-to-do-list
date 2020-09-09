'use strict';

const AWS = require('aws-sdk');

module.exports.delete = (event, context, callback) => {
  const databaseConnection = event.databaseConnection || new AWS.DynamoDB.DocumentClient();
  const databaseParams = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      id: event.pathParameters.id,
    },
  };

  databaseConnection.delete(databaseParams, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't delete the todo item",
      });
      return;
    }

    const response = {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: null,
    };
    callback(null, response);
  });
};
