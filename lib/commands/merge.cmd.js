'use strict';

const { join } = require('path');

const merge = require('../modules/merge.mdl');

const fs = require('fs');
const ldir = join(process.cwd(), 'licenses');
const createLicenseDir = () => {
  if (!fs.existsSync(ldir)) {
    fs.mkdirSync(ldir);
  }
};

module.exports = () => {
  const cmd = {};
  cmd.command = ['merge'];
  cmd.desc = 'Merge license XML files.';
  cmd.builder = {
    'merge-project-name': {
      alias: 'mpn',
      describe: 'The name the project which the license.xml are part of.',
      demand: true,
      nargs: 1
    },
    'merge-license-xmls': {
      alias: 'mlx',
      describe: 'A comma separated list of license.xml files to merge.',
      demand: true,
      nargs: 1
    },
    'merge-output': {
      alias: 'mo',
      describe: 'File to write the merged license info to.',
      demand: true,
      nargs: 1
    }
  };

  cmd.handler = (argv) => {
    createLicenseDir();
    merge.merge(argv.mpn, argv.mlx, argv.mo);
  };

  return cmd;
};
