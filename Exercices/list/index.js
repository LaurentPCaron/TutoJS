#!/usr/bin/env node

const fs = require('fs');
const util = require('util');
const chalk = require('chalk');
const path = require('path');

//#1:Manual way to make a primise
/* const lstat =(fileName)=>{
    return new Promise((resolve, reject)=>{
      fs.lstat(fileNames, (err, stats)=>{
        if(err){
          reject(err)
        }

        resolve(stats)
      })
    })
  } */

//#2:promise with the "util"
//const lstat = util.promisify(fs.lstat);

//#3:fs.promise
const { lstat } = fs.promises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, fileNames) => {
  if (err) {
    throw new Error(err);
  }

  const statPromises = fileNames.map(fileName => {
    return lstat(path.join(targetDir, fileName));
  });

  const allStats = await Promise.all(statPromises);

  allStats.forEach((stats, index) => {
    console.log(
      stats.isFile() ? fileNames[index] : chalk.bold.yellow(fileNames[index])
    );
  });

  // Naive solution
  /*  for (let filename of fileNames) {
    try {
      const stats = await lstat(filename);

      console.log(filename, stats.isFile());
    } catch (err) {
      console.log(err);
    }
  } */
});

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

//Naive approche with callback

/*  const allStats = Array(fileNames.length).fill(null);

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
  }); */
