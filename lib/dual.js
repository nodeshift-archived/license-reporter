'use strict';

// Exceptional case for dual license
// more details see:
// https://github.com/bucharest-gold/license-reporter/issues/173
function isDual (str) {
  return /(\bOR\b)|(\bor\b)|(\bAND\b)|(\band\b)/.test(str);
}

function first (str) {
  let license = str.replace(/[()]/gi, '');
  license = license.substring(0, license.indexOf(' '));
  return license;
}

function last (str) {
  let license = str.replace(/[()]/gi, '');
  license = license.substring(license.lastIndexOf(' ') + 1);
  return license;
}

module.exports = {
  isDual,
  first,
  last
};
