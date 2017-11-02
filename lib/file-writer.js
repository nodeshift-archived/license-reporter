'use strict';

const path = require('path');
const fs = require('graceful-fs');
const yaml = require('yamljs');
const js2xmlparser = require('js2xmlparser');
const xml = require('./xml');
const html = require('./html');
const messages = require('./messages');
const util = require('./util');

// Creates a xml file and/or send to stdout based on the options.
function createXml (options, xmlObject) {
  const createdXml = js2xmlparser.parse('licenseSummary', xmlObject);
  if (!options.silent) {
    console.log(createdXml);
  }
  if (options.xml) {
    const fileName = options.xml.substring(0, options.xml.length - path.extname(options.xml).length);
    fs.writeFileSync(path.join(util.licensesDir(), `${fileName}.xml`), createdXml);
  }
}

// Creates a json file and/or send to stdout based on the options.
function createJson (options, xmlObject) {
  if (!options.silent) {
    console.log('%j', xmlObject);
  }
  if (options.json) {
    const fileName = options.json.substring(0, options.json.length - path.extname(options.json).length);
    fs.writeFileSync(path.join(util.licensesDir(), `${fileName}.json`), JSON.stringify(xmlObject, null, '\t'));
  }
}

// Creates a yaml file and/or send to stdout based on the options.
function createYaml (options, xmlObject) {
  if (!options.silent) {
    console.log(yaml.stringify(xmlObject, 4));
  }
  if (options.yaml) {
    const fileName = options.yaml.substring(0, options.yaml.length - path.extname(options.yaml).length);
    fs.writeFileSync(path.join(util.licensesDir(), `${fileName}.yaml`), yaml.stringify(xmlObject, 4));
  }
}

const findDependency = (name, type, list) => list.find(d => d.name === name && d.type === type);

const notUsingReadmeAsLicenseFile = (name, list) => list.find(d => {
  return d.name === name && (d.file && path.basename(d.file) !== 'README.md');
});

// Creates a html file with license data.
function createHtml (options, xmlObject, dependencyLicenseFiles) {
  xmlObject.dependencies.dependency.forEach(d => {
    const dependencyFound = findDependency(d.packageName, d.licenses.license[0].name, dependencyLicenseFiles);
    if (dependencyFound) {
      const finalName = `${dependencyFound.name}_${dependencyFound.type}.txt`;
      const link = path.join('./', finalName);
      if (notUsingReadmeAsLicenseFile(d.packageName, dependencyLicenseFiles)) {
        if (dependencyFound.file.includes(dependencyFound.type.split(' ')[0].toUpperCase())) {
          d.localLicense = require('querystring').escape(link).replace(/%2F/gi, '/');
          d.linkLabel = link;
        } else {
          d.localLicense = '#';
          d.linkLabel = messages.NO_LOCAL_LICENSE_FOUND();
        }
      } else {
        d.localLicense = '#';
        d.linkLabel = messages.NO_LOCAL_LICENSE_FOUND();
      }
    } else {
      d.localLicense = '#';
      d.linkLabel = messages.NO_LOCAL_LICENSE_FOUND();
    }
  });

  html.parse(xmlObject).then(output => {
    fs.writeFileSync(path.join(util.licensesDir(), 'license.html'), output);
    if (fs.existsSync(options.css)) {
      fs.createReadStream(path.resolve(options.css))
      .pipe(fs.createWriteStream(path.join(util.licensesDir(), 'licenses.css')));
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
      fs.writeFileSync(path.join(util.licensesDir(), options.mergeOutput), result);
    }
  }).catch(e => {
    console.error(e);
    process.exit(2);
  });
}

// Creates a license directory if not exists.
// This function is executed when using --html option.
function createLicenseDir () {
  if (!fs.existsSync(util.licensesDir())) {
    fs.mkdirSync(util.licensesDir());
  }
}

// Copy license files to 'license' directory.
function copyLicenseFiles (dependencyLicenseFiles) {
  const licensesNotFound = [];
  dependencyLicenseFiles.forEach(d => {
    if (d.file && path.basename(d.file) !== 'README.md') {
      let finalName = `${d.name}_${d.type}.txt`;
      finalName = finalName.replace(/@/gi, '');
      finalName = finalName.replace(/\//gi, '-');
      fs.createReadStream(d.file)
       .pipe(fs.createWriteStream(path.join(util.licensesDir(), finalName)));
    } else {
      licensesNotFound.push(d.name);
    }
  });
  if (licensesNotFound.length > 0) {
    console.log(messages.NO_LICENSE_FOUND_SEPARATOR());
    licensesNotFound.forEach(l => {
      console.log(l);
    });
  }
}

module.exports = {
  createXml,
  createHtml,
  mergeXmls,
  createJson,
  createYaml,
  createLicenseDir,
  copyLicenseFiles
};
