'use strict';

const mustache = require('mustache');
const fs = require('fs');
const path = require('path');
const template = fs.readFileSync(path.join(__dirname, '/resources/template.html'), 'utf8');

function parse (object) {
  return new Promise((resolve, reject) => {
    resolve(mustache.render(template, object).trim());
  });
}

module.exports = { parse };
