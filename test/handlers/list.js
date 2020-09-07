'use strict';

const mochaPlugin = require('serverless-mocha-plugin');
const sinon  = require('sinon');
const AWS = require('aws-sdk');

const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('list', '/src/handlers/list.js', 'list');

describe('list', () => {
  const databseStub = sinon.createStubInstance(AWS.DynamoDB.DocumentClient);
  const args = {
    databaseConnection: databseStub,
  };

  describe('when making a request', () => {
    let response;

    describe('and the database returns data', () => {
      const returnedData = [1,2,3]

      before(async () => {
        databseStub.scan.yieldsRight(false, { Items: returnedData });
        response = await wrapped.run(args);
      })

      it('should return a 200 http status', () => {
        expect(response.statusCode).to.equal(200);
      });

      it('should return the content type as application json', () => {
        expect(response.headers['Content-Type']).to.equal('application/json');
      });

      it('should return parsed data from the database', () => {
        expect(response.body).to.equal(JSON.stringify(returnedData));
      });
    });

    describe('and there is a problem on the database', () => {
      before(async () => {
        databseStub.scan.yieldsRight(true, {});
        response = await wrapped.run(args);
      })

      it('should return a 500 http status', () => {
        expect(response.statusCode).to.equal(500);
      });

      it('should return the content type as plain text', () => {
        expect(response.headers['Content-Type']).to.equal('text/plain');
      });

      it('should return a friendly error message', () => {
        expect(response.body).to.equal(
          'There was a problem retrieving the items'
        );
      });
    });
  });
});
