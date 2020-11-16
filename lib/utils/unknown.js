'use strict';

const unknown = 'UNKNOWN';

const unknownCheck = (value) => {
  return value === undefined ||
    value === '' ||
    value.toUpperCase() === unknown ||
    value.startsWith('Custom');
};

module.exports.check = function (project) {
  return project.dependencies.dependency.filter((dep) => {
    let found = false;
    for (const idx in dep.licenses.license) {
      const l = dep.licenses.license[idx];
      if (Array.isArray(l.name)) {
        for (let i = 0; i < l.name.length; i++) {
          if (unknownCheck(l.name[i])) {
            l.name[i] = unknown;
            found = true;
          }
        }
      } else if (unknownCheck(l.name)) {
        dep.licenses.license[idx].name = unknown;
        found = true;
      }
      if (unknownCheck(l.url)) {
        dep.licenses.license[idx].url = unknown;
        found = true;
      }
    }
    return found;
  });
};
