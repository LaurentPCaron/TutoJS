const should = require('chai').should();
const { laurent, getTodayDate } = require('../src/index');
const index = require('../src/index');

context('', () => {
  it('it test', () => {
    laurent().should.be.a('string');
  });
});
