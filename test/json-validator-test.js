'use strict';

const test = require('tape');
const path = require('path');
const stdout = require('test-console').stdout;
const jsonValidator = require('../lib/json-validator.js');

test('Should validate unified list JSON.', (t) => {
  t.plan(1);
  const jsonPath = path.join(__dirname, '../lib/resources/default-unified-list.json');
  const log = stdout.inspectSync(() => jsonValidator.validateUnifiedList(jsonPath));
  const expected = [];
  t.deepEqual(log, expected);
  t.end();
});
