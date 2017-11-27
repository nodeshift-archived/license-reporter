'use strict';

const mustache = require('mustache');
const fs = require('fs');
const { join } = require('path');
const template = fs.readFileSync(join(__dirname, '/resources/template.html'), 'utf8');

const parse = (object) => {
  return new Promise((resolve, reject) => {
    resolve(mustache.render(template, object).trim());
  });
};

module.exports = {
  parse
};
