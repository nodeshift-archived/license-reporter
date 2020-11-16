'use strict';

/* eslint-env jest */

const { join } = require('path');
const fs = require('fs');
const cwd = process.cwd();

const consoleModule = require('../../lib/modules/console.mdl');
const saveModule = require('../../lib/modules/save.mdl');

const unifiedList = require('../../lib/utils/unified-list');
const canonicalName = require('../../lib/utils/canonical-name');

const licenseDir = require('../../lib/utils/license-dir');
const ldir = licenseDir.create('licenses');

const ul = join(
  __dirname,
  '../../lib/utils/resources/default-unified-list.json'
);
const nm = join(
  __dirname,
  '../../lib/utils/resources/default-canonical-names.json'
);

unifiedList.load(ul);

const rawData = [
  {
    dependency: 'foo@123',
    licenses: '(MIT OR Apache-2.0)',
    file: '/foo/LICENSE'
  },
  {
    dependency: 'yargs@8.0.2', // declared
    licenses: 'MIT',
    file: '/foo/LICENSE'
  },
  {
    dependency: 'bar@321',
    licenses: 'APACHE-2.0',
    file: '/bar/LICENSE'
  },
  {
    dependency: 'license-checker@13.1.0', // declared
    licenses: 'BSD-3-Clause',
    file: '/bar/LICENSE'
  }
];

test('Saves the data to XML.', () => {
  const mappings = canonicalName.loadNameMapperFile(nm);
  const cnm = canonicalName.init(mappings);
  const data = consoleModule.transform(rawData, cnm, cwd, false);
  saveModule.save(data, { xml: 'foo.xml', o: 'licenses' });
  expect(fs.existsSync(join(ldir, 'foo.xml'))).toBeTruthy();
  fs.unlinkSync(join(ldir, 'foo.xml'));
});

test('Saves the data to JSON.', () => {
  const mappings = canonicalName.loadNameMapperFile(nm);
  const cnm = canonicalName.init(mappings);
  const data = consoleModule.transform(rawData, cnm, cwd, false);
  saveModule.save(data, { json: 'foo.json', o: 'licenses' });
  expect(fs.existsSync(join(ldir, 'foo.json'))).toBeTruthy();
  fs.unlinkSync(join(ldir, 'foo.json'));
});
