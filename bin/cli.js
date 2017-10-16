'use strict';

const checker = require('license-checker');
const versionHandler = require('../lib/version-handler.js');
const warnings = require('../lib/warnings.js');
const reader = require('../lib/file-reader.js');
const writer = require('../lib/file-writer.js');
const fs = require('fs');
const path = require('path');
const unifiedList = require('../lib/unified-list.js');

// Gets the project name, version and license from package.json.
const projectName = (options) => require(`${options.directory}/package.json`).name;
const projectVersion = (options) => require(`${options.directory}/package.json`).version;
const projectLicense = (options) => require(`${options.directory}/package.json`).license;

// Gets the project dependencies from package.json.
const projectDependencies = (options) => require(`${options.directory}/package.json`).dependencies;

let canonicalNameMapper;
let dependencyLicenseFiles = [];

// Returns an Object with:
// The name of dependency
// The type: MIT , Apache-2.0 etc.
// The location of the licenseFile.
function createDependencyLicenseFile (name, type, file) {
  return {
    name: name,
    type: type,
    file: file ? file : ''
  }
}

// The generated XMl element will be like this example:
//  <license>
//    <name>roi</name>
//    <version>0.15.0</version>
//    <license>Apache-2.0</license>
//    <file> file content here. </file>
//  </license>
const entry = (info, dependency, options) => {
  const canonicalName = canonicalNameMapper.map(info.licenses);
  dependencyLicenseFiles.push(createDependencyLicenseFile(dependency.name, canonicalName, info.licenseFile));
  unifiedList.init(options);
  const url = unifiedList.urlForName(options, canonicalName);
  return {
    packageName: dependency.name,
    version: dependency.version,
    licenses: {
      license: [{
        name: canonicalName,
        url: options.verbose ? reader.readLicenseFile(info.licenseFile) : url
      }]
    }
  };
};

// This function will populate the licenses array with
// data based on the project's declared dependencies found
// inside json data of all dependencies.
// Also returns the json object xmlElement with the data found.
// The parameter 'identifier' can be a dependency
// nameVersion or a name. example: roi@1.2.3 or roi
function addLicenseEntry (xmlElement, identifier, json, options) {
  if (json.hasOwnProperty(identifier)) {
    // name and version object e.g. { name: 'roi', version: '1.2.3' }
    const nameVersion = versionHandler.fromNpmVersion(identifier);
    xmlElement.dependencies.dependency.push(entry(json[identifier], nameVersion, options));
  }
  return xmlElement;
}

// Same as addLicenseEntry but ignores the difference between the
// version declared on package.json and the version installed by npm.
function addLicenseEntryIgnoreVersionRange (xmlElement, identifier, json, options) {
  const name = identifier.split('@')[0];
  for (const key in json) {
    if (key.indexOf(name) > -1) {
      const nameVersion = versionHandler.fromNpmVersionIgnoreRange(identifier);
      xmlElement.dependencies.dependency.push(entry(json[key], nameVersion, options));
    }
  }
  xmlElement.dependencies.dependency = xmlElement.dependencies.dependency
  .filter((d, index, self) => self.findIndex((t) => {
    return t.version === d.version && t.licenses.license[0].name === d.licenses.license[0].name;
  }) === index);
  return xmlElement;
}

// Returns an object that will represent the XML element.
const createXmlObject = (options) => {
  const xmlObject = {
    project: projectName(options),
    version: projectVersion(options)
  };
  if (options.metadata) {
    xmlObject.license = projectLicense(options);
  }
  xmlObject.dependencies = {dependency: []};
  return xmlObject;
};

// Gathers the licenses of the json for each
// dependency declared on the project.
// It is possible to choose between top level dependencies
// or all (including sub-modules -> options.alldeps) and
// populates the xml elements with the data found.
function xmlObjectData (options, declaredDependencies, json) {
  const xmlObject = createXmlObject(options);
  if (options.alldeps) {
    // the name and version e.g. roi@1.2.3
    for (const nameVersion in json) {
      addLicenseEntry(xmlObject, nameVersion, json, options);
    }
  } else {
    if (options.ignoreVersionRange) {
      for (const name in declaredDependencies) {
        const nameVersion = versionHandler.nameVersion(name, declaredDependencies[name]);
        addLicenseEntryIgnoreVersionRange(xmlObject, nameVersion, json, options);
      }
    } else {
      // name - is only the name e.g. roi and not roi@1.2.3
      for (const name in declaredDependencies) {
        const npmVersion = versionHandler.asNpmVersion(name, declaredDependencies[name]);
        addLicenseEntry(xmlObject, npmVersion, json, options);
      }
    }
  }
  return xmlObject;
}

// Shows warning messages if needed.
function showWarnings (options, declaredDependencies, xmlObject) {
  const unknown = require('../lib/unknown.js').check(xmlObject);
  const xmlObjectDependencies = xmlObject.dependencies.dependency.map(e => e.packageName);
  const missingDependencies = Object.keys(declaredDependencies)
                                    .filter(e1 => xmlObjectDependencies
                                    .filter(e2 => e2 === e1)
                                    .length === 0);
  if (missingDependencies.length > 0 && !options.ignoreVersionRange) {
    console.log(`Dependencies found in package.json but not in xml: ${missingDependencies.join(',')}`);
    console.log(`Please run 'license-reporter --ignore-version-range' to show all declared dependencies on generated xml.`);
  }
  warnings.print(unknown, 'UNKNOWN');
  unifiedList.init(options);
  unifiedList.check(options, xmlObject);
}

// This function will scan the license data.
function checkLicense (options, declaredDependencies) {
  // NOTE: The json argument will have all the license information
  // for each module and it's dependencies of the project.
  return new Promise((resolve, reject) => {
    checker.init({start: options.directory}, (error, json) => {
      if (error) {
        reject(error);
      } else {
        resolve(xmlObjectData(options, declaredDependencies, json));
      }
    });
  });
}

// Checks if node_modules exists and returns
// true if it is not empty not considering '.bin'
// directory.
const nodeModulesFound = (dir) => {
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

// This function is the license's entry point
// to gather licenses. Also create the xml,
// print warnings and create html in case needed.
function run (options) {
  if (nodeModulesFound(options.directory)) {
    let mappings = [];
    if (options.nameMap) {
      mappings = reader.readAsJson(options.nameMap);
      if (mappings === null) {
        console.error('Could not find name map file: ', options.nameMap);
        process.exit(3);
      }
    }
    canonicalNameMapper = require('../lib/canonical-name.js')(mappings);
    if (options.merge) {
      writer.mergeXmls(options);
      return;
    }
    const declaredDependencies = projectDependencies(options);
    checkLicense(options, declaredDependencies)
    .then(xmlObject => {
      writer.createXml(options, xmlObject);
      if (options.json) {
        writer.createJson(options, xmlObject);
      }
      if (options.yaml) {
        writer.createYaml(options, xmlObject);
      }
      if (!options.silent) {
        showWarnings(options, declaredDependencies, xmlObject);
      }
      if (options.html) {
        writer.createLicenseDir();
        writer.copyLicenseFiles(dependencyLicenseFiles);
        dependencyLicenseFiles = [];
        writer.createHtml(options, xmlObject);
      }
    }).catch(e => {
      console.error(e);
    });
  } else {
    const xmlObject = createXmlObject(options);
    xmlObject.license = projectLicense(options);
    writer.createXml(options, xmlObject);
    if (options.json) {
      writer.createJson(options, xmlObject);
    }
    if (options.yaml) {
      writer.createYaml(options, xmlObject);
    }
  }
}

module.exports = {
  run
};
