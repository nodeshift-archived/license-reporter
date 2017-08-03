'use strict';

const fromNpmVersionRegex = /^([@\w-./]+)@[~^]?([\d.]+)/;

function fromNpmVersion (version) {
  const match = fromNpmVersionRegex.exec(version);
  if (match) {
    return {
      name: match[1],
      version: match[2]
    };
  }
  return match;
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
