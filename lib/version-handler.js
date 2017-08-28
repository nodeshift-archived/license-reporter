'use strict';

function fromNpmVersion (version) {
  const nameVersion = version.split('@');
  // Scoped packages might be used where the version
  // would be in the format @org/foo@1.1.0.
  if (nameVersion.length === 3) {
    return {
      name: `${nameVersion[0]}${nameVersion[1]}`,
      version: nameVersion[2]
    };
  }
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
