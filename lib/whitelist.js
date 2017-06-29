'use strict';

const whitelist = require('./resources/default-whitelist.json');
var keys = {};

function check (project) {
  const nok = project.licenses.license.filter((license) => {
    return !keys[license.license];
  });
  return nok;
}

module.exports = function (list) {
  whitelist.forEach((entry) => {
    keys[entry.name] = true;
  });

  if (list) {
    list.forEach((entry) => {
      keys[entry.name] = true;
    });
  }

  return { 'check': check };
};
