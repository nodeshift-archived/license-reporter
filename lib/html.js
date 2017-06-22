'use strict';

const mustache = require("mustache");
const fs = require('fs');
const template = fs.readFileSync('lib/template.html', 'utf8');

function parse(object) {
  return mustache.to_html(template, object);
}

module.exports = { parse };
