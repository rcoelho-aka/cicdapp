var assert = require('assert');

describe('Dummy test cases', function () {
    describe('Test Case A', function () {
    it('Should always pass', function () {
      assert(true)
    });
  });
});

describe('Test Case B', function () {
    it('Should also always pass', function () {
    assert(true)
    });
    //to cause error
    it('Should also not pass', function () {
    assert(false)
    });
});