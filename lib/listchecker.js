'use strict';

function check (keys, predicate) {
  return function (project) {
    return project.dependencies.dependency.filter((dep) => {
      return predicate(keys, dep.licenses.license);
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
