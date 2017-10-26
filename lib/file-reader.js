'use strict';

const fs = require('graceful-fs');
const messages = require('./messages');

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
        return messages.NO_LOCAL_LICENSE_FOUND();
      } else {
        throw e;
      }
    }
  }
};

module.exports = {
  readLicenseFile,
  readAsJson
};
