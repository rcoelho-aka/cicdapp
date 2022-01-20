const assert = require('assert');
const app = require('./src/app.js');
const should = require('chai').should();
const request = require('supertest');

<<<<<<< HEAD
describe('Dummy test cases', function() {
  describe('Test Case A', function() {
    it('Should always pass', function() {
=======
describe('Dummy test cases', function () {
  describe('Test Case A', function () {
    it('Should always pass', function () {
>>>>>>> vdv-aka-00
      assert(true)
    });
  });

<<<<<<< HEAD
  describe('Test Case B', function() {
    it('Should also always pass', function() {
=======
  describe('Test Case B', function () {
    it('Should also always pass', function () {
>>>>>>> vdv-aka-00
      assert(true)
    });
  });

  // describe('Main route', function () {
  //   const version = process.env.VERSION || 'local'
  //   it('should return Hello World!', function (done) {
  //     request(app)
  //       .get('/')
  //       .expect(200)
  //       .expect(function (res) {
  //         res.text.should.equal(`Hello World! \n Version: ${version}`);
  //       })
  //       .end(function (err, res) {
  //         if (err) throw err;
  //         done();
  //       });
  //   });
  // });

});