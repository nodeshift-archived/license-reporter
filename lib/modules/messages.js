'use strict';

const APPROVED_SEPARATOR = () => '========= APPROVED LICENSES        ==========';
const NOT_APPROVED_SEPARATOR = () => '========= NOT APPROVED LICENSES    ==========';
const CLARIFICATION_SEPARATOR = () => '========= CLARIFICATION ADVISED    ==========';
const NO_LICENSE_FOUND_SEPARATOR = () => '========= No license file found for==========';
const WARNING_SEPARATOR = (type) => `========= WARNING ${type} LICENSES ==========`;
const NO_LOCAL_LICENSE_FOUND = () => 'No local license could be found for the dependency';

// DON'T delete.
// this code was part of 'license-dependency.js' and we need to
// find a better place to add, and better place to use this function.
/*
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
} */

const showUsingVersionRange = (declaredDependencies, projectMetaData) => {
  const packageNames = projectMetaData.dependencies.dependency.map(e => e.packageName);
  const missingDependencies = Object.keys(declaredDependencies)
  .filter(e1 => packageNames
  .filter(e2 => e2 === e1)
  .length === 0);
  if (missingDependencies.length > 0) {
    console.log(`Dependencies using npm version range: ${missingDependencies.join(',')}`);
  }
};

const warning = (dependencies, type) => {
  if (dependencies.length > 0) {
    console.log(WARNING_SEPARATOR(type));
    dependencies.forEach((dep) => {
      const licenseNames = [];
      dep.licenses.license.forEach((license) => {
        if (license.url === 'UNKNOWN') {
          licenseNames.push(license.url);
        } else {
          licenseNames.push(license.name);
        }
      });
      console.log(`name: ${dep.packageName}, version: ${dep.version}, licenses: ${licenseNames}`);
    });
    console.log(WARNING_SEPARATOR(type));
  }
};

const print = (list, separator) => {
  if (list.size > 0) {
    console.log(separator);
    Array.from(list).forEach((l) => {
      console.log('name:', l.name,
           ', version:', l.version,
           ', licenses:', l.license);
    });
    console.log(separator);
  }
};

module.exports = {
  print,
  warning,
  showUsingVersionRange,
  APPROVED_SEPARATOR,
  NOT_APPROVED_SEPARATOR,
  CLARIFICATION_SEPARATOR,
  NO_LOCAL_LICENSE_FOUND,
  NO_LICENSE_FOUND_SEPARATOR
};
