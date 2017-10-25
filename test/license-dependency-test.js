'use strict';

const test = require('tape');
const path = require('path');
const licenseDependency = require('../lib/license-dependency');

test('Inits the name mapper.', (t) => {
  t.plan(1);
  const nameMap = path.join(__dirname,
    '../lib/resources/default-canonical-names.json');
  t.notEqual(licenseDependency.initNameMapper({nameMap: nameMap}), null, 'mappings not empty.');
  t.end();
});
