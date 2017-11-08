'use strict';

const { join, basename, resolve } = require('path');
const fs = require('graceful-fs');
const html = require('./html');

const ldir = join(process.cwd(), 'licenses');

const NO_LOCAL_LICENSE_FOUND = () => 'No local license could be found for the dependency';

const findDependency = (name, type, list) => list.find(d => d.name === name && d.type === type);

const notUsingReadmeAsLicenseFile = (name, list) => list.find(d => {
  return d.name === name && (d.file && basename(d.file) !== 'README.md');
});

// Creates a html file with license data.
function createHtml (options, xmlObject, dependencyLicenseFiles) {
  xmlObject.dependencies.dependency.forEach(d => {
    const dependencyFound = findDependency(d.packageName, d.licenses.license[0].name, dependencyLicenseFiles);
    if (dependencyFound) {
      const finalName = `${dependencyFound.name}_${dependencyFound.type}.txt`;
      const link = join('./', finalName);
      if (notUsingReadmeAsLicenseFile(d.packageName, dependencyLicenseFiles)) {
        if (dependencyFound.file.includes(dependencyFound.type.split(' ')[0].toUpperCase())) {
          d.localLicense = require('querystring').escape(link).replace(/%2F/gi, '/');
          d.linkLabel = link;
        } else {
          d.localLicense = '#';
          d.linkLabel = NO_LOCAL_LICENSE_FOUND();
        }
      } else {
        d.localLicense = '#';
        d.linkLabel = NO_LOCAL_LICENSE_FOUND();
      }
    } else {
      d.localLicense = '#';
      d.linkLabel = NO_LOCAL_LICENSE_FOUND();
    }
  });

  html.parse(xmlObject).then(output => {
    fs.writeFileSync(join(ldir, 'license.html'), output);
    if (fs.existsSync(options.css)) {
      fs.createReadStream(resolve(options.css))
      .pipe(fs.createWriteStream(join(ldir, 'licenses.css')));
    } else {
      console.error(`CSS file not found: ${options.css}`);
    }
  });
}

// Creates a license directory if not exists.
// This function is executed when using --html option.
function createLicenseDir () {
  if (!fs.existsSync(ldir)) {
    fs.mkdirSync(ldir);
  }
}

// Copy license files to 'license' directory.
function copyLicenseFiles (dependencyLicenseFiles) {
  const licensesNotFound = [];
  dependencyLicenseFiles.forEach(d => {
    if (d.file && basename(d.file) !== 'README.md') {
      let finalName = `${d.name}_${d.type}.txt`;
      finalName = finalName.replace(/@/gi, '');
      finalName = finalName.replace(/\//gi, '-');
      fs.createReadStream(d.file)
       .pipe(fs.createWriteStream(join(ldir, finalName)));
    } else {
      licensesNotFound.push(d.name);
    }
  });
  if (licensesNotFound.length > 0) {
    console.log('========= No license file found for==========');
    licensesNotFound.forEach(l => {
      console.log(l);
    });
  }
}

module.exports = {
  createHtml,
  createLicenseDir,
  copyLicenseFiles
};
