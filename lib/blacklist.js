'use strict';

const listchecker = require('./listchecker.js');

function inBlacklist (keys, licenses) {
  for (let i = 0; i < licenses.length; i++) {
    if (keys[licenses[i].name.trim()]) {
      return true;
    }
  }
  return false;
}

module.exports = function (list) {
  return listchecker(require('./resources/default-blacklist.json'),
                     inBlacklist,
                     list);
};
