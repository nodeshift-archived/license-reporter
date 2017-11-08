'use strict';

const test = require('tape');
const { join } = require('path');
const stdout = require('test-console').stdout;
const validator = require('../../lib/modules/validator');
const cwd = process.cwd();

test('Checks if project has node modules.', (t) => {
  t.plan(2);
  t.ok(validator.projectHasNodeModules(cwd), `project has node modules.`);
  t.notOk(validator.projectHasNodeModules('foo'), `project has no modules.`);
  t.end();
});

test('Validates unified list.', (t) => {
  t.plan(1);
  const jsonPath = join(__dirname, '../../lib/modules/resources/default-unified-list.json');
  const log = stdout.inspectSync(() => validator.validate(jsonPath));
  const expected = [];
  t.deepEqual(log, expected);
  t.end();
});
