'use strict';

const test = require('tape');

test('Map license names to one defined in map file.', (t) => {
  t.plan(5);
  const nameMap = {
    'MIT License': ['The MIT License', 'MIT'],
    'Some': ['Something']
  };
  const mapper = require('../../lib/utils/canonical-name').init(nameMap);
  t.equal(mapper.map('The MIT License'), 'MIT License', 'should map');
  t.equal(mapper.map('MIT'), 'MIT License', 'should map');
  t.equal(mapper.map('Something'), 'Some', 'should map');
  t.equal(mapper.map('Bogus'), 'UNKNOWN', 'unmapped should just pass through');
  t.equal(mapper.map('MIT, AST'), 'MIT License, UNKNOWN', 'should map comma separated');
  t.end();
});

test('Do not map if nameMap is undefined', (t) => {
  t.plan(1);
  const mapper = require('../../lib/utils/canonical-name').init();
  t.equal(mapper.map('MIT'), 'MIT');
  t.end();
});

test('Returns license names in case dual.', (t) => {
  t.plan(1);
  const nameMap = {
    'MIT OR Apache-2.0': ['The MIT License', 'MIT'],
    'Some': ['Something']
  };
  const mapper = require('../../lib/utils/canonical-name').init(nameMap);
  t.equal(mapper.map('MIT'), 'MIT OR Apache-2.0', 'should map');
  t.end();
});
