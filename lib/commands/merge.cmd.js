'use strict';

const merge = require('../modules/merge.mdl');
const licenseDir = require('../utils/license-dir');

exports.command = 'merge';
exports.desc = 'Merge license XML files.';
exports.builder = {
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
  },
  'output-dir': {
    alias: 'o',
    describe: 'Output directory.',
    default: 'licenses'
  }
};

exports.handler = (argv) => {
  licenseDir.create(argv.o);
  merge.merge(argv.mpn, argv.mlx, argv.mo, argv.o);
};
