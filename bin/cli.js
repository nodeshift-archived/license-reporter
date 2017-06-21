'use strict';
const checker = require('license-checker');
const xml = require('js2xmlparser');
const fs = require('fs');
const fromNpmVersionRegex = /^([\w-.]+)@[~^]?([\d.]+)/;

module.exports = function run(options) {
  checker.init({start: options.directory}, function(err, allDeps) {
    if (err) {
      //Handle error
    } else {
      const projectName = require(options.directory + "/package.json").name;
      const projectDeps = require(options.directory + "/package.json").dependencies;

      let licenseInfo = {
        licenses: {
          license: []
        }
      };

      if (options.alldeps) {
        for (var npmVersion in allDeps) {
          add(licenseInfo, npmVersion, allDeps);
        }
      } else {
        for (var name in projectDeps) {
          const npmVersion = asNpmVersion(name, projectDeps[name]);
          add(licenseInfo, npmVersion, allDeps);
        }
      }

      if (!options.silent) {
        console.log(xml.parse(projectName, licenseInfo));
      }

      if (options.file) {
        fs.writeFileSync(options.file, xml.parse(projectName, licenseInfo));
      }
    }
  });
};

function add(licenseInfo, npmVersion, allDeps) {
  if (allDeps.hasOwnProperty(npmVersion)) {
    const nameVersion = fromNpmVersion(npmVersion);
    const info = allDeps[npmVersion];
    licenseInfo.licenses.license.push(entry(info, nameVersion)); 
  }
}

function entry(info, npmVersion) {
  var entry = {
    name: npmVersion.name,
    version: npmVersion.version,
    licenses:  info.licenses,
    file: readLicenseFile(info.licenseFile)
  }
  return entry;
}

function readLicenseFile(file) {
  if (file) {
    return fs.readFileSync(file, 'utf8') 
  }
  return 'N/A';
}

function fromNpmVersion(version) {
  const match = fromNpmVersionRegex.exec(version);
  return {
    name: match[1],
    version: match[2]
  }
}

function asNpmVersion(name, version) {
  if (/^[~^]\d+/.test(version)) {
     version = version.substring(1);
  }
  return `${name}@${version}`;
}
