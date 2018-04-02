'use strict';

const test = require('tape');
const { join } = require('path');
const stdout = require('test-console').stdout;
const validator = require('../../lib/utils/validator');

test('Validates unified list.', (t) => {
  t.plan(1);
  const jsonPath = join(__dirname, '../../lib/utils/resources/default-unified-list.json');
  const log = stdout.inspectSync(() => validator.validate(jsonPath));
  const expected = [];
  t.deepEqual(log, expected);
  t.end();
});

test('Validates wrong unified list.', (t) => {
  t.plan(1);
  const jsonPath = join(__dirname, '../fixtures/bad-unified-list.json');
  const log = stdout.inspectSync(() => validator.validate(jsonPath));
  const expected = ['The unified list you provided has errors:\n'];
  t.deepEqual(log, expected);
  t.end();
});
