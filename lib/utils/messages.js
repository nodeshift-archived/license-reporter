'use strict';

const WARNING_SEPARATOR = (type) => `========= WARNING ${type} LICENSES ==========`;

const usingVersionRange = (declaredDependencies, projectMetaData) => {
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

const show = (declaredDependencies, projectMetaData) => {
  usingVersionRange(declaredDependencies, projectMetaData);
  const unifiedList = require('./unified-list');
  unifiedList.check(projectMetaData);
  const unknown = require('./unknown.js').check(projectMetaData);
  warning(unknown, 'UNKNOWN');
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
  show
};
