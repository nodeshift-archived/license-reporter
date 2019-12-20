'use strict';

const fs = require('fs');
const { join, extname } = require('path');
const yaml = require('js-yaml');

const consoleModule = require('./console.mdl');

let ldir = '';

const fileName = (file) => {
  return file.substring(0, file.length - extname(file).length);
};

const asXML = (data, file) => {
  const name = fileName(file);
  fs.writeFileSync(join(ldir, `${name}.xml`), consoleModule.asXML(data));
};

const asJSON = (data, file) => {
  const name = fileName(file);
  fs.writeFileSync(join(ldir, `${name}.json`), JSON.stringify(data, null, '\t'));
};

const asYAML = (data, file) => {
  const name = fileName(file);
  fs.writeFileSync(join(ldir, `${name}.yaml`), yaml.dump(data));
};

const save = (data, argv) => {
  ldir = join(process.cwd(), argv.o);
  if (argv.json) {
    asJSON(data, argv.json);
  }

  if (argv.yaml) {
    asYAML(data, argv.yaml);
  }

  if (argv.xml) {
    asXML(data, argv.xml);
  }
  if (!argv.json && !argv.yaml && !argv.xml) {
    console.log('You need to provide at least one file type: --xml or --json or --yaml.');
  }
};

module.exports = {
  save
};
