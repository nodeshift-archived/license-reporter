'use strict';

const checker = require('license-checker');
const xml = require('../lib/xml.js');
const versionHandler = require('../lib/version-handler.js');
const warnings = require('../lib/warnings.js');
const reader = require('../lib/file-reader.js');
const js2xmlparser = require('js2xmlparser');
const fs = require('fs');
const path = require('path');

// Gets the project name from package.json.
const projectName = (options) => require(`${options.directory}/package.json`).name;

// Gets the project dependencies from package.json.
const projectDependencies = (options) => require(`${options.directory}/package.json`).dependencies;

// Creates a xml file and/or send to stdout based on the options.
function createXml (options, xmlObject) {
  const createdXml = js2xmlparser.parse(projectName(options), xmlObject.licenses);
  if (!options.silent) {
    console.log(createdXml);
  }
  if (options.file) {
    fs.writeFileSync(options.file, createdXml);
  }
}

// Returns an object that will represent the XML entry for the license element.
// The generated XMl element will be like this example:
//  <license>
//    <name>roi</name>
//    <version>0.15.0</version>
//    <license>Apache-2.0</license>
//    <file> file content here. </file>
//  </license>
const entry = (info, dependency) => {
  return {
    name: dependency.name,
    version: dependency.version,
    license: info.licenses,
    file: reader.readLicenseFile(info.licenseFile)
  };
};

function addLicenseEntry (xmlElement, npmVersion, allDeps) {
  if (allDeps.hasOwnProperty(npmVersion)) {
    const dependency = versionHandler.fromNpmVersion(npmVersion);
    const info = allDeps[npmVersion];
    xmlElement.licenses.license.push(entry(info, dependency));
  }
  return xmlElement;
}

// Returns an object that will represent the XML element.
const createXmlObject = () => {
  return {
    name: projectName,
    licenses: {
      license: []
    }
  };
};

// Gathers the licenses of the json for each
// dependency declared on the project.
// It is possible to choose between top level dependencies
// or all (including sub-modules -> options.alldeps) and
// populates the xml elements with the data found.
function populateXmlObject (options, json) {
  const dependencies = projectDependencies(options);
  const xmlObject = createXmlObject();
  if (options.alldeps) {
    for (var npmVersion in json) {
      addLicenseEntry(xmlObject, npmVersion, json);
    }
  } else {
    for (var name in dependencies) {
      const npmVersion = versionHandler.asNpmVersion(name, dependencies[name]);
      addLicenseEntry(xmlObject, npmVersion, json);
    }
  }
  return xmlObject;
}

function checkLicense (options) {
  // NOTE: The json argument will have all the license information
  // for each module and it's dependencies of the project.
  checker.init({start: options.directory}, (error, json) => {
    if (error) {
      console.error(error);
    } else {
      const xmlObject = populateXmlObject(options, json);

      createXml(options, xmlObject);

      if (!options.silent) {
        const whitelist = reader.readListFile(options.whitelist);
        const blacklist = reader.readListFile(options.blacklist);
        warnings.print(require('../lib/whitelist.js')(whitelist).check(xmlObject),
                   'WHITE-LISTED');

        warnings.print(require('../lib/blacklist.js')(blacklist).check(xmlObject),
                  'BLACK-LISTED');
        const unknown = require('../lib/unknown.js').check(xmlObject);
        warnings.print(unknown, 'UNKNOWN');
      }

      if (options.html) {
        const html = require('../lib/html.js');
        html.parse(xmlObject).then(output => {
          fs.writeFileSync('license.html', output);
        });
        // copy the file licenses.css to the same level of license.html.
        fs.createReadStream(path.join(__dirname, '../lib/resources/licenses.css'))
        .pipe(fs.createWriteStream(path.join(options.directory, 'licenses.css')));
      }
    }
  });
}

// Checks if node_modules exists and returns
// true if it is not empty not considering '.bin'
// directory.
const nodeModulesFound = (dir) => {
  const modulesDir = path.join(dir, 'node_modules');
  const content = fs.readdirSync(modulesDir).filter(e => e !== '.bin');
  return fs.existsSync(modulesDir) && content.length > 0;
};

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
