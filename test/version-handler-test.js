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
  t.equal(undefined, result.version, 'the version not match.');
  t.end();
});

test('Should return as npm version.', (t) => {
  t.plan(2);
  const result = npmVersion('foo', '3.2.1');
  t.equal('foo', result.name, 'the name is OK.');
  t.equal('3.2.1', result.version, 'the version is OK.');
  t.end();
});

test('Should comply with semver spec.', (t) => {
  t.plan(4);
  t.equal('3.20.1-14', npmVersion('foo', '3.20.1-14').version);
  t.equal('1.0.0-x.7.z.92', npmVersion('foo', '1.0.0-x.7.z.92').version);
  t.equal('1.0.0-alpha+001', npmVersion('foo', '1.0.0-alpha+001').version);
  t.equal('1.0.0+20130313144700', npmVersion('foo', '1.0.0+20130313144700').version);
  t.end();
});

function npmVersion (name, version) {
  const npmVersion = versionHandler.asNpmVersion(name, version);
  return versionHandler.fromNpmVersion(npmVersion);
}
