'use strict';

const reader = require('../lib/file-reader.js');
const writer = require('../lib/file-writer.js');
const remoteLicense = require('../lib/remote-license');
const project = require('../lib/project');
const licenseDependency = require('../lib/license-dependency');

// This function is the license's entry point
// to gather licenses. Also create the xml,
// print warnings and create html in case needed.
function run (options) {
  if (project.hasNodeModules(options.directory)) {
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
    licenseDependency.initNameMapper(mappings);
    if (options.merge) {
      writer.mergeXmls(options);
      return;
    }
    const declaredDependencies = project.dependencies(options);
    licenseDependency.checkLicense(options, declaredDependencies)
    .then(xmlObject => {
      writer.createLicenseDir();
      writer.createXml(options, xmlObject);
      if (options.json) {
        writer.createJson(options, xmlObject);
      }
      if (options.yaml) {
        writer.createYaml(options, xmlObject);
      }
      if (!options.silent) {
        licenseDependency.showWarnings(options, declaredDependencies, xmlObject);
      }
      if (options.html) {
        licenseDependency.htmlReport(options, xmlObject);
      }
    }).catch(e => {
      console.error(e);
    });
  } else {
    const xmlObject = licenseDependency.createXmlObject(options);
    xmlObject.license = project.license(options);
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
