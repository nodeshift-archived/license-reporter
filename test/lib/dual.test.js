'use strict';

/* eslint-env jest */

const dual = require('../../lib/utils/dual.js');

const license = 'MIT';
const dualLicense = '(MIT OR Apache-2.0)';

test('Checks if is dual license or not.', () => {
  expect.assertions(2);
  expect(dual.isDual(dualLicense)).toBeTruthy();
  expect(dual.isDual(license)).toBeFalsy();
});

test('Extracts the first part of the dual license string.', () => {
  expect.assertions(1);
  expect(dual.first(dualLicense)).toBe('MIT');
});

test('Extracts the second part of the dual license string.', () => {
  expect.assertions(1);
  expect(dual.last(dualLicense)).toBe('Apache-2.0');
});
