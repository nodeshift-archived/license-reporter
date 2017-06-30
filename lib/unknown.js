'use strict';

const unknown = 'UNKNOWN';

module.exports.check = function (project) {
  return project.licenses.license.filter((license) => {
    let found = false;
    if (unknownCheck(license.license)) {
      license.license = unknown;
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
