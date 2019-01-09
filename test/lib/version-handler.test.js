'use strict';

/* eslint-env jest */

const versionHandler = require('../../lib/utils/version-handler.js');

const npmVersion = (n, v) => {
  const npmVersion = versionHandler.asNpmVersion(n, v);
  return versionHandler.fromNpmVersion(npmVersion);
};

test('Should succeed matching npm version.', () => {
  expect.assertions(2);
  const result = versionHandler.fromNpmVersion('licenser@0.0.1');
  expect('licenser').toBe(result.name);
  expect('0.0.1').toBe(result.version);
});

test('Should fail matching npm version.', () => {
  expect.assertions(1);
  const result = versionHandler.fromNpmVersion('FooBar');
  expect(undefined).toBe(result.version);
});

test('Should return as npm version.', () => {
  expect.assertions(2);
  const result = npmVersion('foo', '3.2.1');
  expect('foo').toBe(result.name);
  expect('3.2.1').toBe(result.version);
});

test('Should comply with semver spec.', () => {
  expect.assertions(4);
  expect('3.20.1-14').toBe(npmVersion('foo', '3.20.1-14').version);
  expect('1.0.0-x.7.z.92').toBe(npmVersion('foo', '1.0.0-x.7.z.92').version);
  expect('1.0.0-alpha+001').toBe(npmVersion('foo', '1.0.0-alpha+001').version);
  expect('1.0.0+20130313144700').toBe(npmVersion('foo', '1.0.0+20130313144700').version);
});

test('Should work with scoped package naming', () => {
  expect.assertions(2);
  const result = npmVersion('@org/foo', '1.0.0+20130313144700');
  expect('@org/foo').toBe(result.name);
  expect('1.0.0+20130313144700').toBe(result.version);
});
