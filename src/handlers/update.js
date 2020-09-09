'use strict';

const AWS = require('aws-sdk');

module.exports.update = (event, context, callback) => {
  const data = JSON.parse(event.body);

  if (typeof data.text !== 'string' || typeof data.checked !== 'boolean') {
   callback(null, {
     statusCode: 400,
     headers: { 'Content-Type': 'text/plain' },
     body: "'text' should be a string and 'checked' should be a boolean",
   });
   return;
  }

  const timestamp = new Date().getTime();
  const databaseConnection = event.databaseConnection || new AWS.DynamoDB.DocumentClient();
  const databaseParams = {
   TableName: process.env.DYNAMODB_TABLE,
   Key: {
     id: event.pathParameters.id,
   },
   ExpressionAttributeNames: {
     '#todo_text': 'text',
   },
   ExpressionAttributeValues: {
     ':text': data.text,
     ':checked': data.checked,
     ':updatedAt': timestamp,
   },
   UpdateExpression: 'SET #todo_text = :text, checked = :checked, updatedAt = :updatedAt',
   ReturnValues: 'ALL_NEW',
  };

  databaseConnection.update(databaseParams, (error, result) => {
   if (error) {
     console.error(error);
     callback(null, {
       statusCode: 500,
       headers: { 'Content-Type': 'text/plain' },
       body: "Couldn't update the todo item",
     });
     return;
   }

   const response = {
     statusCode: 200,
     headers: {
       'Content-Type': 'application/json',
       'Access-Control-Allow-Origin': '*',
     },
     body: JSON.stringify(result.Attributes),
   };
   callback(null, response);
  });
};
