'use strict';

const mochaPlugin = require('serverless-mocha-plugin');
const sinon  = require('sinon');
const AWS = require('aws-sdk');

const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('delete', '/src/handlers/delete.js', 'delete');

describe('delete', () => {
  const databseStub = sinon.createStubInstance(AWS.DynamoDB.DocumentClient);
  const args = {
    databaseConnection: databseStub,
    pathParameters: { id: 123 },
  };

  describe('when making a request', () => {
    let response;

    describe('and the item is deleted from the database', () => {
      before(async () => {
        databseStub.delete.yields(false);
        response = await wrapped.run(args);
      })

      it('should return a 204 http status', () => {
        expect(response.statusCode).to.equal(204);
      });

      it('should return a null body', () => {
        expect(response.body).to.equal(null);
      });


      it('should return that anywhere can receive the response', () => {
        expect(response.headers['Access-Control-Allow-Origin']).to.equal('*');
      });
    });

    describe('and there is a problem on the database', () => {
      before(async () => {
        databseStub.delete.yields(true);
        response = await wrapped.run(args);
      })

      it('should return a 500 http status', () => {
        expect(response.statusCode).to.equal(500);
      });

      it('should return the content type as plain text', () => {
        expect(response.headers['Content-Type']).to.equal('text/plain');
      });

      it('should return a friendly error message', () => {
        expect(response.body).to.equal("Couldn't delete the todo item");
      });
    });
  });
});
