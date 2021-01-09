const expect = require('chai').expect;
const sinon = require('sinon');
const robot = require('robotjs');
const prompt = require('prompt');

const IOHandler = require('../src/IOHandler');

context('IOHandler', () => {
  context('printLocationChoises', () => {
    it('should return a message that ask the user to chose a location', async () => {
      //const consoleSpy = sinon.spy(prompt, 'property.message');

      const response = IOHandler.printLocationChoises(['Montréal', 'Edmonton']);
      robot.typeString('0');
      robot.keyTap('enter');
      /* expect(
        consoleSpy.calledWith(
          `***Select a location****\n0- Cancel1- Montréal\n2- Edmonton\n`
        ) 
      ).to.be.true;*/
      expect(await response).equal(-1);
    });
  });
});
