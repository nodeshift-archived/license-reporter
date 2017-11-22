'use strict';

const licenseChecker = require('license-checker');

const check = (cwd, productionOnly) => {
  return new Promise((resolve, reject) => {
    licenseChecker.init({start: cwd, production: productionOnly}, (error, json) => {
      if (error) {
        reject(error);
      } else {
        resolve(Object.keys(json).map((j) => {
          json[j].dependency = j;
          return { dependency: json[j].dependency,
            licenses: json[j].licenses,
            file: json[j].licenseFile
          };
        }));
      }
    });
  });
};

module.exports = {
  check
};
