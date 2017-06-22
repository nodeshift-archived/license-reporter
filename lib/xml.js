'use strict';

const xml = require('js2xmlparser');

function parse (projectName, object) {
  return xml.parse(projectName, object);
}

module.exports = { parse };
