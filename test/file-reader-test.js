'use strict';

const test = require('tape');
const path = require('path');
const proxyquire = require('proxyquire');
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

test('Should return N/A for file not found.', (t) => {
  const filePath = path.join(__dirname, '/fixtures/readme/node_modules/sample_dependency_readme/NotFound');
  t.plan(1);
  t.equal('N/A', reader.readLicenseFile(filePath), 'N/A returned.');
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

test('Should return null if http resource not found.', (t) => {
  const requestStub = function (method, url) {
    return { statusCode: 404 };
  };
  const reader = proxyquire('../lib/file-reader.js', { 'sync-request': requestStub });
  t.plan(1);
  t.equal(null, reader.readAsJson('http://bogus.com/namemap.json'));
  t.end();
});

test('Should return JSON if http resource is found.', (t) => {
  const requestStub = function (method, url) {
    return {
      statusCode: 200,
      body: `{ "name": "something"}`
    };
  };
  const reader = proxyquire('../lib/file-reader.js', { 'sync-request': requestStub });
  t.plan(1);
  const json = reader.readAsJson('http://bogus.com/namemap.json');
  t.equal(json.name, 'something');
  t.end();
});
