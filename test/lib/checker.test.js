/* eslint-disable no-prototype-builtins */
'use strict';

/* eslint-env jest */

const cwd = process.cwd();
const checker = require('../../lib/utils/checker');

const numJestDeps = json => json.filter(d => d.dependency.startsWith('jest@')).length;

test('Checks licenses.', () => {
  expect.assertions(5);
  return checker.check(cwd)
    .then((json) => {
      expect(json).toBeDefined();
      expect(json[0].hasOwnProperty('dependency')).toBeTruthy();
      expect(json[0].hasOwnProperty('licenses')).toBeTruthy();
      expect(json[0].hasOwnProperty('file')).toBeTruthy();
      expect(numJestDeps(json) > 0).toBeTruthy();
    })
    .catch((e) => {
      console.error(e);
    });
});

test('Checks licenses with production-only argument.', () => {
  expect.assertions(5);
  return checker.check(cwd, true)
    .then((json) => {
      expect(json).toBeDefined();
      expect(json[0].hasOwnProperty('dependency')).toBeTruthy();
      expect(json[0].hasOwnProperty('licenses')).toBeTruthy();
      expect(json[0].hasOwnProperty('file')).toBeTruthy();
      expect(numJestDeps(json) === 0).toBeTruthy();
    })
    .catch((e) => {
      console.error(e);
    });
});
