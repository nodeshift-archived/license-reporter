'use strict';

function print (deps, type) {
  if (deps.length > 0) {
    console.log(`========= WARNING ${type} LICENSES ==========`);
    deps.forEach((dep) => {
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
}

module.exports = {
  print
};
