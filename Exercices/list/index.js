#!/usr/bin/env node

const fs = require('fs');
const { isNull } = require('util');

fs.readdir(process.cwd(), (err, fileNames) => {
  if (err) {
    throw new Error(err);
  }
  /************/
  //The result will not always be the same because of the time to find the information on the computer
  /**********/
  /* fileNames.forEach(aFile => {
    fs.lstat(aFile, (err, stats) => {
      if (err) {
        throw new Error(err);
      }

      console.log(aFile, stats.isFile());
    });
  }); */

  const allStats = Array(fileNames.length).fill(null);

  fileNames.forEach((aFile, index) => {
    fs.lstat(aFile, (err, stats) => {
      if (err) {
        throw new Error(err);
      }
      allStats[index] = stats;

      const ready = allStats.every(stats => {
        return stats;
      });
      if (ready) {
        allStats.forEach((stats, index) => {
          console.log(fileNames[index], stats.isFile());
        });
      }
    });
  });

  console.log(fileNames);
});
