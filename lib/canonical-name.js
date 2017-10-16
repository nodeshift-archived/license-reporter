'use strict';

const namesMap = new Map();

// Exceptional case for dual license
// more details here: https://github.com/bucharest-gold/license-reporter/issues/173#issuecomment-336710018
function exceptionDualLicense(str) {
  return /(\bOR\b)|(\bor\b)|(\bAND\b)|(\band\b)/.test(str);
}

function map (name) {
  if (name.indexOf(',') !== -1) {
    return name.split(',').map((name) => {
      return get(name.trim());
    }).join(', ');
  }
  return get(name);
}

function get (name) {
  const mapped = namesMap.get(name);
  if (exceptionDualLicense(name)) {
    return name;
  }
  if (mapped === undefined) {
    return 'UNKNOWN';
  }
  if (Array.isArray(mapped)) {
    return mapped.join(', ');
  }
  return mapped;
}

module.exports = function (list) {
  if (!list) {
    return { 'map': (name) => name };
  }
  for (const key in list) {
    list[key].forEach((name) => {
      namesMap.set(name, key);
    });
  }
  return { 'map': map };
};
