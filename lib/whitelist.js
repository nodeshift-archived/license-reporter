'use strict';

const listchecker = require('./listchecker.js');

module.exports = function (list) {
  return listchecker(require('./resources/default-whitelist.json'),
                     (keys, license) => !keys[license] && license.toUpperCase() !== 'UNKNOWN',
                     list);
};
