const assert = require('assert');
const app = require('./src/app.js');
const should = require('chai').should();
const request = require('supertest');

describe('Dummy test cases', function() {
  describe('Test Case A', function() {
    it('Should always pass', function() {
      assert(true)
    });
  });

  describe('Test Case B', function() {
    it('Should also always pass', function() {
      assert(true)
    });
  });

  describe('Main route', function () {
    const version = process.env.VERSION || 'local'
    it('should return Hello World!', function (done) {
      request(app)
        .get('/')
        .expect(200)
        .expect(function (res) {
          res.text.should.equal(`Hello World! \n Version: ${version}`);
        })
        .end(function (err, res) {
          if (err) throw err;
          done();
        });
    });
  });

});