'use strict';

const merge = require('../modules/merge.mdl');

module.exports = () => {
  const cmd = {};
  cmd.command = ['merge'];
  cmd.desc = 'Merge license XML files.';
  cmd.builder = {
    'merge-product-name': {
      alias: 'mpn',
      describe: 'The name the product which the license.xml are part of.',
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
    merge.merge(argv.mpn, argv.mlx, argv.mo);
  };

  return cmd;
};
