'use strict';

const warning = (dependencies, type) => {
  if (dependencies.length > 0) {
    console.log(`========= WARNING ${type} LICENSES ==========`);
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
    console.log(`========= WARNING ${type} LICENSES ==========`);
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
  warning
};
