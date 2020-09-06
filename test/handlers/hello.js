'use strict';

const mochaPlugin = require('serverless-mocha-plugin');
const expect = mochaPlugin.chai.expect;
let wrapped = mochaPlugin.getWrapper('hello', '/src/handlers/handler.js', 'hello');

describe('hello', () => {
  let response;

  before(async () => {
    response = await wrapped.run({});
  });

  describe('when making a request', () => {
    it('should return a 200 http status', () => {
      expect(response.statusCode).to.equal(200);
    });

    it('should return a friendly body', () => {
      expect(response.body).to.equal('Hello there');
    });

    describe('the headers', () => {
      let headers

      before(() => {
        headers = response.headers;
      });

      it('should set the content as plain text', () => {
        expect(headers['Content-Type']).to.equal('text/plain');
      });
    });
  });
});
