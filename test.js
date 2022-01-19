var assert = require('assert');

describe('Dummy test cases', function () {
  describe('Test Case A', function () {
    it('Should always pass', function () {
      assert(true)
    });
  });

  describe('Test Case B', function () {
    it('Should also always pass', function () {
      assert(true)
    });
  });

});

// describe("Add function", () => {
//   it("should return 2 added numbers", () => {
//     const result = add(2, 2);
//     expect(result).to.be.eq(5);
//   });
// });