'use strict';

const js2xmlparser = require('js2xmlparser');
const xml = require('../lib/xml.js');
const html = require('../lib/html.js');
const fs = require('fs');
const path = require('path');

// Creates a xml file and/or send to stdout based on the options.
function createXml (options, xmlObject) {
  const createdXml = js2xmlparser.parse('licenseSummary', xmlObject);
  if (!options.silent) {
    console.log(createdXml);
  }
  if (options.file) {
    const fileName = options.file.substring(0, path.extname(options.file).length - 1);
    fs.writeFileSync(`${fileName}.xml`, createdXml);
  }
}

// Creates a html file with license data.
function createHtml (options, xmlObject) {
  html.parse(xmlObject).then(output => {
    fs.writeFileSync('license.html', output);
    // copy the file licenses.css to the same level of license.html.
    if (fs.existsSync(options.css)) {
      fs.createReadStream(path.resolve(options.css))
      .pipe(fs.createWriteStream(path.join(options.directory, 'licenses.css')));
    } else {
      console.error(`CSS file not found: ${options.css}`);
    }
  });
}

// This function will merge previous generated xmls.
function mergeXmls (options) {
  if (!options.mergeProductName) {
    console.error('merge feature requires a product name');
    process.exit(1);
  }
  if (!options.mergeXmls) {
    console.error('merge feature requires a two or more licence.xml files to merge');
    process.exit(1);
  }
  const xmls = [];
  options.mergeXmls.split(',').forEach((file) => {
    xmls.push(fs.readFileSync(file.trim(), 'utf8'));
  });
  xml.merge(options.mergeProductName, xmls).then(result => {
    if (!options.silent) {
      console.log(result);
    }
    if (options.mergeOutput) {
      fs.writeFileSync(options.mergeOutput, result);
    }
  }).catch(e => {
    console.error(e);
    process.exit(2);
  });
}

module.exports = {
  createXml,
  createHtml,
  mergeXmls
};
