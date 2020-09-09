'use strict';

const AWS = require('aws-sdk');
const uuid = require('uuid');

module.exports.create = (event, context, callback) => {
  const timestamp = new Date().getTime();
  const data = JSON.parse(event.body);
  if (typeof data.text !== 'string') {
    callback(null, {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: "'text' should be a string",
    });
    return;
  }

  const databaseConnection = event.databaseConnection || new AWS.DynamoDB.DocumentClient();
  const databaseParams = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      id: uuid.v1(),
      text: data.text,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };


  databaseConnection.put(databaseParams, (error) => {
    if (error) {
      console.error(error);
      callback(null, {
        statusCode: 500,
        headers: { 'Content-Type': 'text/plain' },
        body: "Couldn't create the todo item",
      });
      return;
    }

    const response = {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(databaseParams.Item),
    };
    callback(null, response);
  });
};
