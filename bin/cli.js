'use strict';
const checker = require('license-checker');
const xml = require('../lib/xml.js');
const versionHandler = require('../lib/version-handler.js');
const warnings = require('../lib/warnings.js');
const reader = require('../lib/file-reader.js');

const fs = require('fs');
const path = require('path');

function entry (info, npmVersion) {
  var entry = {
    name: npmVersion.name,
    version: npmVersion.version,
    license: info.licenses,
    file: reader.readLicenseFile(info.licenseFile)
  };
  return entry;
}

function add (licenses, npmVersion, allDeps) {
  if (allDeps.hasOwnProperty(npmVersion)) {
    const nameVersion = versionHandler.fromNpmVersion(npmVersion);
    const info = allDeps[npmVersion];
    licenses.license.push(entry(info, nameVersion));
  }
}

function checkLicense (options) {
  checker.init({start: options.directory}, function (err, allDeps) {
    if (err) {
      // Handle error
    } else {
      const projectName = require(`${options.directory}/package.json`).name;
      const projectDeps = require(`${options.directory}/package.json`).dependencies;

      const project = {
        name: projectName,
        licenses: {
          license: []
        }
      };

      if (options.alldeps) {
        for (var npmVersion in allDeps) {
          add(project.licenses, npmVersion, allDeps);
        }
      } else {
        for (var name in projectDeps) {
          const npmVersion = versionHandler.asNpmVersion(name, projectDeps[name]);
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

      if (!options.silent) {
        const whitelist = reader.readListFile(options.whitelist);
        const blacklist = reader.readListFile(options.blacklist);
        warnings.print(require('../lib/whitelist.js')(whitelist).check(project),
                   'WHITE-LISTED');

        warnings.print(require('../lib/blacklist.js')(blacklist).check(project),
                  'BLACK-LISTED');
        const unknown = require('../lib/unknown.js').check(project);
        warnings.print(unknown, 'UNKNOWN');
      }

      if (options.html) {
        const html = require('../lib/html.js');
        html.parse(project).then(output => {
          fs.writeFileSync('license.html', output);
        });
      }
    }
  });
}

/*
* Checks if node_modules exists and returns
* true if it is not empty not considering '.bin'
* directory.
*/
function nodeModulesFound (dir) {
  const modulesDir = path.join(dir, 'node_modules');
  const content = fs.readdirSync(modulesDir).filter(e => e !== '.bin');
  return fs.existsSync(modulesDir) && content.length > 0;
}

function run (options) {
  if (nodeModulesFound(options.directory)) {
    if (options.merge) {
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
      return;
    }

    checkLicense(options);
  } else {
    console.error('You need to run \'npm install\' before search for license information.');
  }
}

module.exports = {
  run
};

