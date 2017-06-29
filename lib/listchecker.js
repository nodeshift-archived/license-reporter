'use strict';

function check (keys, predicate) {
  return function (project) {
    return project.licenses.license.filter((license) => {
      return predicate(keys, license.license.trim());
    });
  };
}

module.exports = function (defaultlist, predicate, list) {
  const keys = {};
  defaultlist.forEach((entry) => {
    keys[entry.name] = true;
  });

  if (list) {
    list.forEach((entry) => {
      keys[entry.name] = true;
    });
  }

  return { 'check': check(keys, predicate) };
};
