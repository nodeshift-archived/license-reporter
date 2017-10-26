'use strict';

const path = require('path');

const currentDir = () => process.cwd();
const licensesDir = () => path.join(process.cwd(), 'licenses');

module.exports = {
  currentDir,
  licensesDir
};
