'use strict';

const test = require('tape');
const { join } = require('path');
const fs = require('fs');
const cwd = process.cwd();

const consoleModule = require('../../lib/modules/console.mdl');
const saveModule = require('../../lib/modules/save.mdl');

const unifiedList = require('../../lib/utils/unified-list');
const canonicalName = require('../../lib/utils/canonical-name');

const licenseDir = require('../../lib/utils/license-dir');
const ldir = licenseDir.create();

const ul = join(__dirname, '../../lib/utils/resources/default-unified-list.json');
const nm = join(__dirname, '../../lib/utils/resources/default-canonical-names.json');

unifiedList.load(ul);

const rawData = [
  { dependency: 'foo@123',
    licenses: '(MIT OR Apache-2.0)',
    file: '/foo/LICENSE' },
  { dependency: 'yargs@8.0.2', // declared
    licenses: 'MIT',
    file: '/foo/LICENSE' },
  { dependency: 'bar@321',
    licenses: 'APACHE-2.0',
    file: '/bar/LICENSE' },
  { dependency: 'license-checker@13.1.0', // declared
    licenses: 'BSD-3-Clause',
    file: '/bar/LICENSE' }];

test('Saves the data to XML.', (t) => {
  t.plan(1);
  const mappings = canonicalName.loadNameMapperFile(nm);
  const cnm = canonicalName.init(mappings);
  const data = consoleModule.transform(rawData, cnm, cwd, false);
  saveModule.save(data, {xml: 'foo.xml'});
  t.equal(fs.existsSync(join(ldir, 'foo.xml')), true, 'foo.xml file created.');
  fs.unlinkSync(join(ldir, 'foo.xml'));
  t.end();
});

test('Saves the data to JSON.', (t) => {
  t.plan(1);
  const mappings = canonicalName.loadNameMapperFile(nm);
  const cnm = canonicalName.init(mappings);
  const data = consoleModule.transform(rawData, cnm, cwd, false);
  saveModule.save(data, {json: 'foo.json'});
  t.equal(fs.existsSync(join(ldir, 'foo.json')), true, 'foo.json file created.');
  fs.unlinkSync(join(ldir, 'foo.json'));
  t.end();
});

test('Saves the data to YAML.', (t) => {
  t.plan(1);
  const mappings = canonicalName.loadNameMapperFile(nm);
  const cnm = canonicalName.init(mappings);
  const data = consoleModule.transform(rawData, cnm, cwd, false);
  saveModule.save(data, {yaml: 'foo.yaml'});
  t.equal(fs.existsSync(join(ldir, 'foo.yaml')), true, 'foo.yaml file created.');
  fs.unlinkSync(join(ldir, 'foo.yaml'));
  setTimeout(() => fs.rmdir(ldir, () => {}), 500);
  t.end();
});
