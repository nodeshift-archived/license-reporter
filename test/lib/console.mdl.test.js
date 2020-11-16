/* eslint-disable no-prototype-builtins */
'use strict';

/* eslint-env jest */

const { join } = require('path');
const cwd = process.cwd();
const consoleModule = require('../../lib/modules/console.mdl');

const unifiedList = require('../../lib/utils/unified-list');
const canonicalName = require('../../lib/utils/canonical-name');

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
  { dependency: 'bar@321', licenses: 'APACHE-2.0', file: '/bar/LICENSE' },
  {
    dependency: 'license-checker@13.1.0', // declared
    licenses: 'BSD-3-Clause',
    file: '/bar/LICENSE'
  }
];

test('Transforms the raw data.', () => {
  expect.assertions(5);
  const mappings = canonicalName.loadNameMapperFile(nm);
  const cnm = canonicalName.init(mappings);
  const data = consoleModule.transform(rawData, cnm, cwd, true, true, true);
  expect(data).toBeDefined();
  expect(data.hasOwnProperty('project')).toBeTruthy();
  expect(data.hasOwnProperty('version')).toBeTruthy();
  expect(data.hasOwnProperty('license')).toBeTruthy();
  expect(data.hasOwnProperty('dependencies')).toBeTruthy();
});
