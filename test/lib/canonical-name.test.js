'use strict';

/* eslint-env jest */

test('Map license names to one defined in map file.', () => {
  expect.assertions(5);
  const nameMap = {
    'MIT License': ['The MIT License', 'MIT'],
    Some: ['Something']
  };
  const mapper = require('../../lib/utils/canonical-name').init(nameMap);
  expect(mapper.map('The MIT License')).toBe('MIT License');
  expect(mapper.map('MIT')).toBe('MIT License');
  expect(mapper.map('Something')).toBe('Some');
  expect(mapper.map('Bogus')).toBe('UNKNOWN');
  expect(mapper.map('MIT, AST')).toBe('MIT License, UNKNOWN');
});

test('Do not map if nameMap is undefined', () => {
  expect.assertions(1);
  const mapper = require('../../lib/utils/canonical-name').init();
  expect(mapper.map('MIT')).toBe('MIT');
});

test('Returns license names in case dual.', () => {
  expect.assertions(1);
  const nameMap = {
    'MIT OR Apache-2.0': ['The MIT License', 'MIT'],
    Some: ['Something']
  };
  const mapper = require('../../lib/utils/canonical-name').init(nameMap);
  expect(mapper.map('MIT')).toBe('MIT OR Apache-2.0');
});
