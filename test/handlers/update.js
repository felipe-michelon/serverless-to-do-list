'use strict';

const mochaPlugin = require('serverless-mocha-plugin');
const sinon  = require('sinon');
const AWS = require('aws-sdk');

const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('update', '/src/handlers/update.js', 'update');

describe('update', () => {
  describe('when making a request', () => {
    let response;

    describe('and the request body is valid', () => {
      const databseStub = sinon.createStubInstance(AWS.DynamoDB.DocumentClient);
      const args = {
        databaseConnection: databseStub,
        pathParameters: { id: 123 },
        body: JSON.stringify({ text: 'new text', checked: true })
      };

      describe('and the item is updated on the database', () => {
        let parsedResponse

        before(async () => {
          databseStub.update.yields(false, { Attributes: { text: 'new text', checked: true }});
          response = await wrapped.run(args);
          parsedResponse = JSON.parse(response.body)
        })

        it('should return a 200 http status', () => {
          expect(response.statusCode).to.equal(200);
        });

        it('should return the content type as application json', () => {
          expect(response.headers['Content-Type']).to.equal('application/json');
        });

        it('should return the updated item', () => {
          expect(parsedResponse.text).to.equal('new text');
          expect(parsedResponse.checked).to.equal(true);
        });
      });

      describe('and there is a problem on the database', () => {
        before(async () => {
          databseStub.update.yields(true, {});
          response = await wrapped.run(args);
        })

        it('should return a 500 http status', () => {
          expect(response.statusCode).to.equal(500);
        });

        it('should return the content type as plain text', () => {
          expect(response.headers['Content-Type']).to.equal('text/plain');
        });

        it('should return a friendly error message', () => {
          expect(response.body).to.equal("Couldn't update the todo item");
        });
      });
    });

    describe('and the request body is not valid', () => {
      before(async () => {
        response = await wrapped.run({
          pathParameters: { id: 123 },
          body: JSON.stringify({ text: 123, checked: 123 })
        });
      });

      it('should return a 400 http status', () => {
        expect(response.statusCode).to.equal(400);
      });

      it('should return the content type as plain text', () => {
        expect(response.headers['Content-Type']).to.equal('text/plain');
      });

      it('should return a friendly error message', () => {
        expect(response.body).to.equal(
          "'text' should be a string and 'checked' should be a boolean"
        );
      });
    });
  });
});
