'use strict';

const mochaPlugin = require('serverless-mocha-plugin');
const sinon  = require('sinon');
const AWS = require('aws-sdk');

const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('create', '/src/handlers/create.js', 'create');

describe('create', () => {
  describe('when making a request', () => {
    let response;

    describe('and the request body is valid', () => {
      const databseStub = sinon.createStubInstance(AWS.DynamoDB.DocumentClient);
      const args = {
        databaseConnection: databseStub,
        body: JSON.stringify({ text: 'text' })
      };

      describe('and the item is saved on the database', () => {
        let parsedResponse
        const clock = sinon.useFakeTimers();

        after(() => {
          clock.restore();
        })

        before(async () => {
          databseStub.put.yields(false);
          response = await wrapped.run(args);
          parsedResponse = JSON.parse(response.body)
        })

        it('should return a 201 http status', () => {
          expect(response.statusCode).to.equal(201);
        });

        it('should return the content type as application json', () => {
          expect(response.headers['Content-Type']).to.equal('application/json');
        });

        it('should return the saved item', () => {
          const currentDate = new Date().getTime()

          expect(parsedResponse.id).to.be.a('string');
          expect(parsedResponse.text).to.equal('text');
          expect(parsedResponse.checked).to.equal(false);
          expect(parsedResponse.createdAt).to.equal(currentDate);
          expect(parsedResponse.updatedAt).to.equal(currentDate);
        });
      });

      describe('and there is a problem on the database', () => {
        before(async () => {
          databseStub.put.yields(true);
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
            "Couldn't create the todo item"
          );
        });
      });
    });

    describe('and the request body is not valid', () => {
      before(async () => {
        response = await wrapped.run({ body: JSON.stringify({ text: 123 }) });
      });

      it('should return a 400 http status', () => {
        expect(response.statusCode).to.equal(400);
      });

      it('should return the content type as plain text', () => {
        expect(response.headers['Content-Type']).to.equal('text/plain');
      });

      it('should return a friendly error message', () => {
        expect(response.body).to.equal("'text' should be a string");
      });
    });
  });
});
