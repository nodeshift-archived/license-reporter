'use strict';

const fs = require('fs');
var request = require('sync-request');

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

function readAsJson (url) {
  if (url.startsWith('http')) {
    const res = request('GET', url);
    if (res.statusCode === 200) {
      return JSON.parse(res.body.toString());
    } else {
      console.log('Could not get resource: ', url);
      console.log('StatusCode returned was: ', res.statusCode);
    }
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
  return 'N/A';
}

module.exports = {
  readListFile,
  readLicenseFile,
  readAsJson
};
