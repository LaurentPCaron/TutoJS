const expect = require('chai').expect;

const ip = require('../src/publicIp');

context.skip('publicIp', () => {
  context('getPublicIp', async () => {
    expect(await ip.getPublicIp()).to.match(
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
    );
  });
});
