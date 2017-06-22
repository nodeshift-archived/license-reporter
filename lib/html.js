'use strict';

const mustache = require('mustache');
const fs = require('fs');
const template = fs.readFileSync('lib/template.html', 'utf8');

function parse (object) {
  return new Promise((resolve, reject) => {
    resolve(mustache.to_html(template, object).trim());
  });
}

module.exports = { parse };
