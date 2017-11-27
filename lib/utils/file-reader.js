'use strict';

const fs = require('fs');

const readAsJson = (file) => {
  let content = '';
  try {
    content = fs.readFileSync(file, 'utf8');
  } catch (e) {
    if (e.code === 'ENOENT') {
      return null;
    } else {
      throw e;
    }
  }
  if (content) {
    return JSON.parse(content);
  }
};

const readLicenseFile = (file) => {
  if (file && file.includes('README')) {
    return file;
  } else {
    let content = '';
    try {
      content = fs.readFileSync(file, 'utf8');
      return content;
    } catch (e) {
      if (e.code === 'ENOENT') {
        return 'No local license could be found for the dependency';
      } else {
        throw e;
      }
    }
  }
};

module.exports = {
  readAsJson,
  readLicenseFile
};
