'use strict';

const fromNpmVersionIgnoreRange = (v) => (
  { name: v.split('@')[0], version: v.split('@')[1] }
);

const nameVersion = (name, version) => `${name}@${version}`;

const fromNpmVersion = (version) => {
  const nameVersion = version.split('@');
  // Scoped packages might be used where the version
  // would be in the format @org/foo@1.1.0.
  if (nameVersion.length === 3) {
    return {
      name: `@${nameVersion[0]}${nameVersion[1]}`,
      version: nameVersion[2]
    };
  }
  return {
    name: nameVersion[0],
    version: nameVersion[1]
  };
};

const asNpmVersion = (name, version) => {
  if (/^[~^]\d+/.test(version)) {
    version = version.substring(1);
  }
  return `${name}@${version}`;
};

module.exports = {
  asNpmVersion,
  fromNpmVersion,
  fromNpmVersionIgnoreRange,
  nameVersion
};
