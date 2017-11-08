'use strict';

const test = require('tape');
const dual = require('../../lib/modules/dual.js');

const license = 'MIT';
const dualLicense = '(MIT OR Apache-2.0)';

test('Checks if is dual license or not.', (t) => {
  t.plan(2);
  t.ok(dual.isDual(dualLicense), `${dualLicense} is dual license.`);
  t.notOk(dual.isDual(license), `${license} is not dual license.`);
  t.end();
});

test('Extracts the first part of the dual license string.', (t) => {
  t.plan(1);
  t.equal(dual.first(dualLicense), 'MIT', `First part extracted.`);
  t.end();
});

test('Extracts the second part of the dual license string.', (t) => {
  t.plan(1);
  t.equal(dual.last(dualLicense), 'Apache-2.0', `Second part extracted.`);
  t.end();
});
