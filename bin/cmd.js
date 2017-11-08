#!/usr/bin/env node
'use strict';

process.title = 'license-reporter';

const { resolve } = require('path');
const yargs = require('yargs');
const { commands } = require('../index.js');

const cwd = resolve(yargs.argv.cwd || process.cwd());
process.chdir(cwd);

commands.forEach(cmd => yargs.command(cmd.command, cmd.desc, cmd.builder, cmd.handler));
yargs
  .help()
  .options({ cwd: { desc: 'Change the current working directory', default: cwd } })
  .demandCommand(1, 'You need at least one command before moving on')
  .argv;
