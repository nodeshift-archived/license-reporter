'use strict';

const unknown = 'UNKNOWN';

module.exports.check = function (project) {
  return project.licenses.license.filter((license) => {
    let found = false;
    let licenses = license.license;
    if (Array.isArray(licenses)) {
      licenses.forEach((license) => {
        if (unknownCheck(license)) {
          license = unknown;
          found = true;
        }
      });
    } else if (unknownCheck(licenses)) {
      licenses = unknown;
      found = true;
    }
    if (unknownCheck(license.file)) {
      license.file = unknown;
      found = true;
    }
    return found;
  });
};

function unknownCheck (value) {
  return value === undefined || value === '' || value.toUpperCase() === unknown;
}
