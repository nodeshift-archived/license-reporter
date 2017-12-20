'use strict';

const test = require('tape');
const { join } = require('path');
const stdout = require('test-console').stdout;
const validator = require('../../lib/utils/validator');
const cwd = process.cwd();

test('Validates unified list.', (t) => {
  t.plan(1);
  const jsonPath = join(__dirname, '../../lib/utils/resources/default-unified-list.json');
  const log = stdout.inspectSync(() => validator.validate(jsonPath));
  const expected = [];
  t.deepEqual(log, expected);
  t.end();
});
