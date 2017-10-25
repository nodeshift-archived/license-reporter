'use strict';

const test = require('tape');
const path = require('path');
const reader = require('../lib/file-reader.js');

test('Should return null when file not found.', (t) => {
  t.plan(1);
  t.equal(null, reader.readListFile(), 'file not found, returned null.');
  t.end();
});

test('Should read a license file.', (t) => {
  const filePath = path.join(__dirname, '/fixtures/license/node_modules/sample_dependency_license/LICENSE');
  t.plan(1);
  t.ok(reader.readLicenseFile(filePath).includes('MIT'), 'successful read the license file.');
  t.end();
});

test('Should return file path instead content for README files.', (t) => {
  const filePath = path.join(__dirname, '/fixtures/readme/node_modules/sample_dependency_readme/README');
  t.plan(1);
  t.equal(filePath, reader.readLicenseFile(filePath), 'File path returned.');
  t.end();
});

test('Should return No local license could be found for the dependency for file not found.', (t) => {
  const filePath = path.join(__dirname, '/fixtures/readme/node_modules/sample_dependency_readme/NotFound');
  t.plan(1);
  t.equal('No local license could be found for the dependency', reader.readLicenseFile(filePath), 'No local license could be found for the dependency returned.');
  t.end();
});

test('Should return file as JSON.', (t) => {
  const filePath = path.join(__dirname, '../lib/resources/default-unified-list.json');
  t.plan(1);
  t.ok(reader.readAsJson(filePath));
  t.end();
});

test('Should return null file not found (JSON).', (t) => {
  t.plan(1);
  t.equal(null, reader.readAsJson('something'));
  t.end();
});
