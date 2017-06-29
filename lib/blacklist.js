'use strict';

const listchecker = require('./listchecker.js');

module.exports = function (list) {
  return listchecker(require('./resources/default-blacklist.json'),
                     (keys, license) => keys[license],
                     list);
};
