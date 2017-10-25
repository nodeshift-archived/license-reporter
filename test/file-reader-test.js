'use strict';

const test = require('tape');
const path = require('path');
const reader = require('../lib/file-reader.js');

test('Reads a license file.', (t) => {
  t.plan(1);
  const file = path.join(__dirname,
    '/fixtures/license/node_modules/sample_dependency_license/LICENSE');
  t.ok(reader.readLicenseFile(file).includes('MIT'), 'File has been read.');
  t.end();
});

test('Returns the file path instead content for README files.', (t) => {
  t.plan(1);
  const file = path.join(__dirname,
    '/fixtures/readme/node_modules/sample_dependency_readme/README');
  t.equal(reader.readLicenseFile(file), file, 'File path returned.');
  t.end();
});

test('Returns a message when no local license could be found.', (t) => {
  t.plan(1);
  const file = path.join(__dirname,
    '/fixtures/readme/node_modules/sample_dependency_readme/NotFound');
  const message = 'No local license could be found for the dependency';
  t.equal(reader.readLicenseFile(file), message, 'Message returned.');
  t.end();
});

test('Return file as JSON.', (t) => {
  t.plan(1);
  const file = path.join(__dirname,
    '../lib/resources/default-unified-list.json');
  t.ok(reader.readAsJson(file), 'JSON returned.');
  t.end();
});

test('Returns null if file not found.', (t) => {
  t.plan(1);
  t.equal(null, reader.readAsJson('something'), 'null returned.');
  t.end();
});
