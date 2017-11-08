'use strict';

const dual = require('./dual');
const urlFetcher = require('./url-fetcher');
const fileReader = require('./file-reader');
const namesMap = new Map();

const get = (name) => {
  const mapped = namesMap.get(name);
  if (dual.isDual(name)) {
    return name;
  }
  if (mapped === undefined) {
    return 'UNKNOWN';
  }
  if (Array.isArray(mapped)) {
    return mapped.join(', ');
  }
  return mapped;
};

const map = (name) => {
  if (name.indexOf(',') !== -1) {
    return name.split(',').map((name) => {
      return get(name.trim());
    }).join(', ');
  }
  return get(name);
};

const init = (list) => {
  if (!list) {
    return { 'map': (name) => name };
  }
  for (const key in list) {
    list[key].forEach((name) => {
      namesMap.set(name, key);
    });
  }
  return { 'map': map };
};

const loadNameMapperFile = (nameMap) => {
  let mappings = [];
  if (nameMap.startsWith('http')) {
    mappings = urlFetcher.fetch(nameMap);
  } else {
    mappings = fileReader.readAsJson(nameMap);
  }
  if (mappings === null) {
    console.error('Could not find name map file: ', nameMap);
    process.exit(3);
  }
  return mappings;
};

module.exports = {
  init,
  loadNameMapperFile
};
