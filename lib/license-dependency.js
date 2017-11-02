'use strict';

const checker = require('license-checker');
const project = require('./project');
const unifiedList = require('./unified-list');
const reader = require('./file-reader');
const writer = require('./file-writer');
const messages = require('./messages');
const versionHandler = require('./version-handler');
const dual = require('./dual');
const remoteLicense = require('./remote-license');

let canonicalNameMapper;
let dependencyLicenseFiles = [];

const initNameMapper = (options) => {
  let mappings = [];
  if (options.nameMap) {
    if (options.nameMap.startsWith('http')) {
      mappings = remoteLicense.fetch(options.nameMap);
    } else {
      mappings = reader.readAsJson(options.nameMap);
    }
    if (mappings === null) {
      console.error('Could not find name map file: ', options.nameMap);
      process.exit(3);
    }
  }
  canonicalNameMapper = require('./canonical-name.js')(mappings);
  return mappings;
};

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
  messages.warning(unknown, 'UNKNOWN');
  unifiedList.init(options);
  unifiedList.check(options, xmlObject);
}

// Returns an object that will represent the XML element.
const createXmlObject = (options) => {
  const xmlObject = {
    project: project.name(options),
    version: project.version(options)
  };
  if (options.metadata) {
    xmlObject.license = project.license(options);
  }
  xmlObject.dependencies = {dependency: []};
  return xmlObject;
};

// Returns an Object with:
// The name of dependency
// The type: MIT , Apache-2.0 etc.
// The location of the licenseFile.
function createDependencyLicenseFile (name, type, file) {
  return {
    name: name,
    type: type,
    file: file
  };
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

  const licenseData = {
    packageName: dependency.name,
    version: dependency.version,
    licenses: {
      license: [{
        name: canonicalName,
        url: options.verbose ? reader.readLicenseFile(info.licenseFile) : url
      }]
    }
  };

  return licenseData;
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

    if (dual.isDual(json[identifier].licenses)) {
      if (options.html) {
        // clone the json item.
        const first = JSON.parse(JSON.stringify(json[identifier]));
        first.licenses = dual.first(first.licenses);
        const licenseDataFirst = entry(first, nameVersion, options);
        xmlElement.dependencies.dependency.push(licenseDataFirst);
        const last = JSON.parse(JSON.stringify(json[identifier]));
        last.licenses = dual.last(json[identifier].licenses);
        const licenseDataLast = entry(last, nameVersion, options);
        xmlElement.dependencies.dependency.push(licenseDataLast);
      } else {
          // clone the json item.
        const first = JSON.parse(JSON.stringify(json[identifier]));
        first.licenses = dual.first(first.licenses);
        const licenseDataFirst = entry(first, nameVersion, options);

        const last = JSON.parse(JSON.stringify(json[identifier]));
        last.licenses = dual.last(json[identifier].licenses);
        const licenseDataLast = entry(last, nameVersion, options);

        licenseDataFirst.licenses.license.push(licenseDataLast.licenses.license[0]);
        xmlElement.dependencies.dependency.push(licenseDataFirst);
      }
    } else {
      xmlElement.dependencies.dependency.push(entry(json[identifier], nameVersion, options));
    }
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

function htmlReport (options, xmlObject) {
  writer.copyLicenseFiles(dependencyLicenseFiles);
  writer.createHtml(options, xmlObject, dependencyLicenseFiles);
  dependencyLicenseFiles = [];
}

module.exports = {
  xmlObjectData,
  createXmlObject,
  showWarnings,
  htmlReport,
  checkLicense,
  initNameMapper
};
