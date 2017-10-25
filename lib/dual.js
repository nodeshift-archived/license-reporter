'use strict';

// Regext to test the cases:
// (A AND B); A AND B; (A OR B) ; A OR B
const isDual = (str) => /(\bOR\b)|(\bor\b)|(\bAND\b)|(\band\b)/.test(str);

// Extracts the first part of the string as:
// 'A' from '(A OR B)'
const first = (str) => {
  const license = str.replace(/[()]/gi, '');
  return license.substring(0, license.indexOf(' '));
};

// Extracts the last part of the string as:
// 'B' from '(A OR B)'
const last = (str) => {
  const license = str.replace(/[()]/gi, '');
  return license.substring(license.lastIndexOf(' ') + 1);
};

module.exports = {
  isDual,
  first,
  last
};
