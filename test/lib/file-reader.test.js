'use strict';

/* eslint-env jest */

const path = require('path');
const reader = require('../../lib/utils/file-reader.js');

test('Reads a license file.', () => {
  expect.assertions(1);
  const file = path.join(__dirname,
    '../fixtures/license/node_modules/sample_dependency_license/LICENSE');
  expect(reader.readLicenseFile(file)).toContain('MIT');
});

test('Returns the file path instead content for README files.', () => {
  expect.assertions(1);
  const file = path.join(__dirname,
    '../fixtures/readme/node_modules/sample_dependency_readme/README');
  expect(reader.readLicenseFile(file)).toBe(file);
});

test('Returns a message when no local license could be found.', () => {
  expect.assertions(1);
  const file = path.join(__dirname,
    '../fixtures/readme/node_modules/sample_dependency_readme/NotFound');
  const message = 'No local license could be found for the dependency';
  expect(reader.readLicenseFile(file)).toBe(message);
});

test('Return file as JSON.', () => {
  expect.assertions(1);
  const file = path.join(__dirname,
    '../../lib/utils/resources/default-unified-list.json');
  expect(reader.readAsJson(file)).toBeDefined();
});

test('Returns null if file not found.', () => {
  expect.assertions(1);
  expect(reader.readAsJson('something')).toEqual(null);
});

test('Throws error read JSON.', () => {
  expect.assertions(1);
  expect(() => {
    reader.readAsJson('.');
  }).toThrow();
});

test('Throws error read license file.', () => {
  expect.assertions(1);
  expect(() => {
    reader.readLicenseFile('.');
  }).toThrow();
});
