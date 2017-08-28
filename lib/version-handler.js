'use strict';

function fromNpmVersion (version) {
  const nameVersion = version.split('@');
  return {
    name: nameVersion[0],
    version: nameVersion[1]
  };
}

function fromNpmVersionIgnoreRange (version) {
  return {
    name: version.split('@')[0],
    version: version.split('@')[1]
  };
}

function asNpmVersion (name, version) {
  if (/^[~^]\d+/.test(version)) {
    version = version.substring(1);
  }
  return `${name}@${version}`;
}

function nameVersion (name, version) {
  return `${name}@${version}`;
}

module.exports = {
  fromNpmVersion, asNpmVersion, nameVersion, fromNpmVersionIgnoreRange
};
