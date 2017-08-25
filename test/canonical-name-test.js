'use strict';

const test = require('tape');

test('Should map license names to one defined in map file', (t) => {
  const nameMap = {
    'MIT License': ['The MIT License', 'MIT'],
    'Some': ['Something']
  };
  const mapper = require('../lib/canonical-name.js')(nameMap);
  t.equal(mapper.map('The MIT License'), 'MIT License', 'should map');
  t.equal(mapper.map('MIT'), 'MIT License', 'should map');
  t.equal(mapper.map('Something'), 'Some', 'should map');
  t.equal(mapper.map('Bogus'), 'Bogus', 'unmapped should just pass through');
  t.equal(mapper.map('MIT, AST'), 'MIT License, AST', 'should map comma separated');
  t.end();
});

test('Should not map if nameMap is undefined', (t) => {
  const mapper = require('../lib/canonical-name.js')();
  t.equal(mapper.map('MIT'), 'MIT');
  t.end();
});
