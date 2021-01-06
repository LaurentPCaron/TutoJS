const fs = require('fs');
const { mkdir, readdir } = fs.promises;
const path = require('path');

const axios = require('axios').default;

const createDogoDir = fileName => {
  return new Promise(resolve => {
    if (fileName.indexOf('dogo') === -1) {
      mkdir('dogo').then(() => {
        resolve();
      });
    }
  });
};

const isEmpty = async () => {
  let res;
  return await readdir(path.join(process.cwd(), '/dogo')).then(fileNames => {
    return fileNames.length === 0;
  });
};

const fetchDogo = async () => {
  return await axios
    .get('https://dog.ceo/api/breeds/image/random')
    .then(res => {
      return res.data.message;
    });
};

const downloadDogo = async url => {
  await axios.get(url, { responseType: 'stream' }).then(res => {
    res.data.pipe(fs.createWriteStream('dogo/dogo.jpg'));
  });
};

const init = async () => {
  await readdir(process.cwd()).then(fileNames => {
    if (fileNames.indexOf('dogo') === -1) {
      createDogoDir(process.cwd());
    }
  });

  const dogoUrl = await fetchDogo();
  await downloadDogo(dogoUrl);
  console.log('Nouveau dogo télécharger!!!');
};

module.exports = { createDogoDir, init, isEmpty, fetchDogo, downloadDogo };
