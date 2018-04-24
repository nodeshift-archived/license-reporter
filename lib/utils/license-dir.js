'use strict';

const path = require('path');
const fs = require('fs');

const create = (dir) => {
  const licenseDir = path.join(process.cwd(), dir);
  if (!fs.existsSync(licenseDir)) {
    fs.mkdirSync(licenseDir);
  }
  return licenseDir;
};

const extension = (file) => path.extname(file) === '.TXT';

const removeLicenses = (licenseDir) => {
  fs.readdir(licenseDir, (error, list) => {
    if (error) throw new Error(error);
    list.filter(extension).forEach((file) => {
      fs.unlinkSync(path.join(licenseDir, file));
    });
  });
};

module.exports = {
  create,
  removeLicenses
};
