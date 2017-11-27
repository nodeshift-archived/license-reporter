'use strict';

const test = require('tape');
const { join } = require('path');
const cwd = process.cwd();
const consoleModule = require('../../lib/modules/console.mdl');

const unifiedList = require('../../lib/utils/unified-list');
const canonicalName = require('../../lib/utils/canonical-name');

const ul = join(__dirname, '../../lib/utils/resources/default-unified-list.json');
const nm = join(__dirname, '../../lib/utils/resources/default-canonical-names.json');

unifiedList.load(ul);

const rawData = [
  { dependency: 'foo@123',
    licenses: '(MIT OR Apache-2.0)',
    file: '/foo/LICENSE' },
  { dependency: 'yargs@8.0.2',  // declared
    licenses: 'MIT',
    file: '/foo/LICENSE' },
  { dependency: 'bar@321',
    licenses: 'APACHE-2.0',
    file: '/bar/LICENSE' },
  { dependency: 'license-checker@13.1.0', // declared
    licenses: 'BSD-3-Clause',
    file: '/bar/LICENSE' }];

test('Transforms the raw data.', (t) => {
  t.plan(5);
  const mappings = canonicalName.loadNameMapperFile(nm);
  const cnm = canonicalName.init(mappings);
  const data = consoleModule.transform(rawData, cnm, cwd, false);
  t.ok(data, `raw data was transformed.`);
  t.ok(data.hasOwnProperty('project'), `data has project attribute.`);
  t.ok(data.hasOwnProperty('version'), `data has version attribute.`);
  t.ok(data.hasOwnProperty('license'), `data has license attribute.`);
  t.ok(data.hasOwnProperty('dependencies'), `data has dependencies attribute.`);
  t.end();
});
