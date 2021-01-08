const expect = require('chai').expect;
const sinon = require('sinon');

const IOHandler = require('../src/IOHandler');

context('IOHandler', () => {
  context('printLocationChoises', () => {
    it('should return a message that ask the user to chose a location', () => {
      const consoleSpy = sinon.spy(console, 'log');

      IOHandler.printLocationChoises(['Montréal', 'Edmonton']);
      expect(
        consoleSpy.calledWith(
          `***Select a location****\n 1- Montréal\n 2- Edmonton`
        )
      ).to.be.true;
    });
  });
});
