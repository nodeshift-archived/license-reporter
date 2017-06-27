'use strict';

const test = require('tape');
const versionHandler = require('../lib/version-handler.js');

test('Should succeed matching npm version.', (t) => {
  t.plan(2);
  const result = versionHandler.fromNpmVersion('licenser@0.0.1');
  t.equal('licenser', result.name, 'the name is OK.');
  t.equal('0.0.1', result.version, 'the version is OK.');
  t.end();
});

test('Should fail matching npm version.', (t) => {
  t.plan(1);
  const result = versionHandler.fromNpmVersion('FooBar');
  t.equal(null, result, 'the version not match.');
  t.end();
});

test('Should return as npm version.', (t) => {
  t.plan(2);
  const npmVersion = versionHandler.asNpmVersion('foo', '3.2.1');
  const result = versionHandler.fromNpmVersion(npmVersion);
  t.equal('foo', result.name, 'the name is OK.');
  t.equal('3.2.1', result.version, 'the version is OK.');
  t.end();
});
