'use strict';

const name = (cwd) => require(`${cwd}/package.json`).name;
const version = (cwd) => require(`${cwd}/package.json`).version;
const license = (cwd) => require(`${cwd}/package.json`).license;
const dependencies = (cwd) => require(`${cwd}/package.json`).dependencies;

const projectMetaData = (cwd) => {
  return {
    project: name(cwd),
    version: version(cwd),
    license: license(cwd),
    dependencies: {dependency: []}
  };
};

module.exports = {
  name,
  version,
  license,
  dependencies,
  projectMetaData
};
