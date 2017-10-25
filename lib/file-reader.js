'use strict';

const fs = require('graceful-fs');
const remoteLicense = require('./remote-license');

/**
 * This function reads a file and return null in case
 * file not found.
 */
function readListFile (file) {
  if (file && fs.existsSync(file)) {
    return fs.readFileSync(file, 'utf8');
  }
  return null;
}

function readAsJson (url) {
  if (url.startsWith('http')) {
    return remoteLicense.fetch(url);
  } else {
    const content = readListFile(url);
    if (content !== null) {
      return JSON.parse(content);
    }
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
  return 'No local license could be found for the dependency';
}

module.exports = {
  readListFile,
  readLicenseFile,
  readAsJson
};
