'use strict';

// @ts-check

// @ts-ignore
const licenseChecker = require('license-checker');

/**
 * Grabs all the licenses information from dependencies.
 * @param {string} cwd Current working directory.
 * @param {boolean} productionOnly true to avoid devDependencies.
 * @returns {object} License information about dependencies.
 */
const check = (cwd, productionOnly) => {
  return new Promise((resolve, reject) => {
    licenseChecker.init(
      { start: cwd, production: productionOnly },
      // @ts-ignore
      (error, json) => {
        if (error) {
          reject(error);
        } else {
          resolve(
            Object.keys(json).map((j) => {
              json[j].dependency = j;
              return {
                dependency: json[j].dependency,
                licenses: json[j].licenses,
                file: json[j].licenseFile
              };
            })
          );
        }
      }
    );
  });
};

module.exports = {
  check
};
