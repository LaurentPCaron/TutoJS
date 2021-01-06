const should = require('chai').should();
const fs = require('fs');
const path = require('path');

const index = require('../src/index');

context('createDogoDir', async () => {
  it('should create  Dogo directory', async () => {
    await fs.promises.rm('dogo', { recursive: true }).then(() => {
      fs.readdir(path.join(process.cwd(), '/dogo'), (err, fileNames) => {
        should.not.exist(fileNames);
      });
    });

    index.createDogoDir(process.cwd()).then(() => {
      fs.readdir(path.join(process.cwd(), '/dogo'), (err, fileNames) => {
        should.exist(fileNames);
      });
    });
  });
});

context('isEmpty', () => {
  it('should return true if the directory is empty', async () => {
    const x = await index.isEmpty();
    x.should.be.true;
  });
  it('should return false if the directory is not empty', async () => {
    await index.init();
    const x = await index.isEmpty();
    x.should.be.false;
  });
});

context('fetchDogo', () => {
  it('should return a random dog object', async () => {
    const res = await index.fetchDogo();
    console.log(res);
    res.should.be.a.string;
  });
});

context('downloadDogo', () => {
  it('should downlaod a dogo image in dogo folder', async () => {
    const res = await index.fetchDogo();
    await index.downloadDogo(res);
    fs.readdir(path.join(process.cwd(), '/dogo'), (err, fileNames) => {
      (fileNames.indexOf('dogo.jpg') !== -1).should.be.true;
    });
  });
});

context('init', () => {
  it("should create dogo folder if it doen't exist and had a new dogo", async () => {
    await fs.promises.rm('dogo', { recursive: true }).then(async () => {
      await index.init();
    });

    fs.readdir(path.join(process.cwd(), '/dogo'), (err, fileNames) => {
      should.exist(fileNames[0] === index.downloadDogo.jpg);
    });
  });
});
