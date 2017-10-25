'use strict';

const fs = require('graceful-fs');
const path = require('path');

const name = (options) => require(`${options.directory}/package.json`).name;
const version = (options) => require(`${options.directory}/package.json`).version;
const license = (options) => require(`${options.directory}/package.json`).license;
const dependencies = (options) => require(`${options.directory}/package.json`).dependencies;

// Checks if node_modules exists and returns
// true if it is not empty not considering '.bin'
// directory.
const hasNodeModules = (dir) => {
  const modulesDir = path.join(dir, 'node_modules');
  if (fs.existsSync(modulesDir)) {
    const content = fs.readdirSync(modulesDir).filter(e => e !== '.bin');
    if (content.length > 0) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

module.exports = {
  hasNodeModules,
  name,
  version,
  license,
  dependencies
};
