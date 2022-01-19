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
    it('Should also not pass', function () {
      assert(false)
    });
  });

});

// //To test the error in UnitTest Stage
// const { add } = require('index');

// describe("Add function", () => {
//   it("should return 2 added numbers", () => {
//     const result = add(2, 2);
//     //expect(result).to.be.eq(5);//to cause error
//     expect(result).to.be.eq(4);
//   });
// });