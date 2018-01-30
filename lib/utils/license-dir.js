'use strict';

const { join } = require('path');
const fs = require('fs');

const create = () => {
  const licenseDir = join(process.cwd(), 'licenses');
  if (!fs.existsSync(licenseDir)) {
    fs.mkdirSync(licenseDir);
  }
  return licenseDir;
};

module.exports = {
  create
};
