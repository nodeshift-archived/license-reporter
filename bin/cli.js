'use strict';
const checker = require('license-checker');
const xml = require('../lib/xml.js');
const fs = require('fs');
const fromNpmVersionRegex = /^([\w-.]+)@[~^]?([\d.]+)/;

module.exports = function run(options) {
  checker.init({start: options.directory}, function(err, allDeps) {
    if (err) {
      //Handle error
    } else {
      const projectName = require(options.directory + "/package.json").name;
      const projectDeps = require(options.directory + "/package.json").dependencies;

      let project = {
        name: projectName,
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
          add(project.licenses, npmVersion, allDeps);
        }
      }

      const report = xml.parse(projectName, project.licenses);
      if (!options.silent) {
        console.log(report);
      }

      if (options.file) {
        fs.writeFileSync(options.file, report);
      }

      var whitelist;
      if (options.whitelist) {
        whitelist = fs.readFileSync(options.whitelist, 'utf8');
      }
      const nok = require('../lib/whitelist.js')(whitelist).check(project);
      if (nok) {
        console.error('========= WARING NON WHITE-LISTED LICENSES ==========');
        nok.forEach((license) => {
          console.log('name:', license.name, 
                      ', version:', license.version,
                      ', licenses:', license.licenses); 
        });
        console.error('========= WARING NON WHITE-LISTED LICENSES ==========');
      }

      if (options.html) {
        let html = require('../lib/html.js');
        html.parse(project).then(output => {
          fs.writeFileSync('license.html', output);
        });
      }
    }
  });
};

function add(licenses, npmVersion, allDeps) {
  if (allDeps.hasOwnProperty(npmVersion)) {
    const nameVersion = fromNpmVersion(npmVersion);
    const info = allDeps[npmVersion];
    licenses.license.push(entry(info, nameVersion));
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
