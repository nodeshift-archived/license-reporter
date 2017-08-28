'use strict';

const listchecker = require('./listchecker.js');

module.exports = function (list) {
  return listchecker(require('./resources/default-whitelist.json'),
                     (keys, license) => {
                       // Don't include unknown license files, regardless of
                       // whether they exist in the whitelist or not.
                       // Let them be reported as unknown instead.
                       if (license.file === 'UNKNOWN') {
                         return false;
                       }
                       const name = license.license.trim();
                       return !keys[name] &&
                         name.toUpperCase().trim() !== 'UNKNOWN';
                     },
                     list);
};
