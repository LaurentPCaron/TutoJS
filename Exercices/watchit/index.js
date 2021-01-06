#!/usr/bin/env node

const fs = require('fs');
const { spawn } = require('child_process');

const chokidar = require('chokidar');
const debounce = require('lodash.debounce');
const program = require('caporal');
const chalk = require('chalk');

program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action(async ({ filename }) => {
    const name = filename || 'index.js';

    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(chalk.red.bold(`Could not find the files ${name}`));
    }
    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      console.log(chalk.blue.bold('>>>>>>> Strating process...'));
      proc = spawn('node', [name], { stdio: 'inherit' });
    }, 500);

    chokidar
      .watch('.', { ignoreInitial: true })
      .on('add', start)
      .on('change', start)
      .on('unlink', start);
  });

program.parse(process.argv);
