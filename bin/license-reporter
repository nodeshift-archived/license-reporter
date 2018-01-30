#!/usr/bin/env node
'use strict';

process.title = 'license-reporter';

const yargs = require('yargs');
const cwd = process.cwd();

yargs
  .usage('Usage: $0 <command> [options]')
  .commandDir('../lib/commands')
  .options({ cwd: { desc: 'Change the current working directory', default: cwd } })
  .demandCommand(1, 'You need at least one command before moving on')
  .argv;
