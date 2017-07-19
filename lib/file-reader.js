'use strict';

const fs = require('fs');

/**
 * This function reads a file.
 * This is to be used to read blacklist and
 * whitelist files, and return null in case
 * file not found.
 */
function readListFile (file) {
  if (file && fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf8');
  }
  return null;
}

/**
 * This function will read the license file only if file found
 * or if it is not a README. If it is readme, then will return
 * the path to the README file, or N/A for other cases.
 */
function readLicenseFile (file) {
  if (file && fs.existsSync(file)) {
    if (file.includes('README')) {
      return file;
    }
    if (!file.includes('README')) {
      return fs.readFileSync(file, 'utf8');
    }
  }
  return 'N/A';
}

module.exports = {
  readListFile,
  readLicenseFile
};
