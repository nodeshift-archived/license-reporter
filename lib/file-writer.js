'use strict';

const js2xmlparser = require('js2xmlparser');
const xml = require('../lib/xml.js');
const html = require('../lib/html.js');
const fs = require('fs');
const path = require('path');
const yaml = require('yamljs');

const licensesDir = path.join(process.cwd(), 'licenses');

// Creates a xml file and/or send to stdout based on the options.
function createXml (options, xmlObject) {
  const createdXml = js2xmlparser.parse('licenseSummary', xmlObject);
  if (!options.silent) {
    console.log(createdXml);
  }
  if (options.xml) {
    const fileName = options.xml.substring(0, options.xml.length - path.extname(options.xml).length);
    fs.writeFileSync(path.join(licensesDir, `${fileName}.xml`), createdXml);
  }
}

// Creates a json file and/or send to stdout based on the options.
function createJson (options, xmlObject) {
  if (!options.silent) {
    console.log('%j', xmlObject);
  }
  const fileName = options.json.substring(0, options.json.length - path.extname(options.json).length);
  fs.writeFileSync(path.join(licensesDir, `${fileName}.json`), JSON.stringify(xmlObject, null, '\t'));
}

// Creates a yaml file and/or send to stdout based on the options.
function createYaml (options, xmlObject) {
  if (!options.silent) {
    console.log(yaml.stringify(xmlObject, 4));
  }
  const fileName = options.yaml.substring(0, options.yaml.length - path.extname(options.yaml).length);
  fs.writeFileSync(path.join(licensesDir, `${fileName}.yaml`), yaml.stringify(xmlObject, 4));
}

// Creates a html file with license data.
function createHtml (options, xmlObject, dependencyLicenseFiles) {
  const findDependency = (name) => dependencyLicenseFiles.find(d => d.name === name);

  xmlObject.dependencies.dependency.forEach(d => {
    const dependencyFound = findDependency(d.packageName);
    if (dependencyFound) {
      const finalName = `${dependencyFound.name}_${dependencyFound.type}.txt`;
      const link = path.join('./', finalName);
      d.localLicense = require('querystring').escape(link).replace(/%2F/gi, '/');
      d.linkLabel = link;
    } else {
      d.localLicense = 'N/A';
    }
  });

  html.parse(xmlObject).then(output => {
    fs.writeFileSync(path.join(licensesDir, 'license.html'), output);
    if (fs.existsSync(options.css)) {
      fs.createReadStream(path.resolve(options.css))
      .pipe(fs.createWriteStream(path.join(licensesDir, 'licenses.css')));
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
      fs.writeFileSync(path.join(licensesDir, options.mergeOutput), result);
    }
  }).catch(e => {
    console.error(e);
    process.exit(2);
  });
}

// Creates a license directory if not exists.
// This function is executed when using --html option.
function createLicenseDir () {
  const dir = path.join(process.cwd(), 'licenses');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

// Copy license files to 'license' directory.
function copyLicenseFiles (dependencyLicenseFiles) {
  const dir = path.join(process.cwd(), 'licenses');
  dependencyLicenseFiles.forEach(d => {
    const finalName = `${d.name}_${d.type}.txt`;
    fs.createReadStream(d.file)
    .pipe(fs.createWriteStream(path.join(dir, finalName)));
  });
}

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
  createXml,
  createHtml,
  mergeXmls,
  createJson,
  createYaml,
  createLicenseDir,
  copyLicenseFiles,
  hasNodeModules
};
