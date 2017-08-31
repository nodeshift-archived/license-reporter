'use strict';

const listchecker = require('./listchecker.js');

function inWhitelist (keys, licenses) {
  for (let i = 0; i < licenses.length; i++) {
    // Don't include unknown license files, regardless of
    // whether they exist in the whitelist or not.
    // Let them be reported as unknown instead.
    if (licenses[i].url === 'UNKNOWN') {
      continue;
    }
    const name = licenses[i].name.trim();
    if (!keys[name] && name.toUpperCase().trim() !== 'UNKNOWN') {
      return true;
    }
  }
}

module.exports = function (list) {
  return listchecker(require('./resources/default-whitelist.json'),
                     inWhitelist,
                     list);
};
