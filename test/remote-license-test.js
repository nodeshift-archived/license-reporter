'use strict';

const test = require('tape');
const proxyquire = require('proxyquire');
const stdout = require('test-console').stdout;

const url = 'http://bogus.com/namemap.json';

test('Returns null if http resource not found.', (t) => {
  t.plan(2);
  const requestStub = function (method, url) {
    return { statusCode: 404 };
  };

  const remoteLicense = proxyquire('../lib/remote-license.js',
  { 'sync-request': requestStub });

  const expected = ['Could not get resource:  http://bogus.com/namemap.json\n',
    'StatusCode returned was:  404\n'];
  const log = stdout.inspectSync(() => remoteLicense.fetch(url));
  t.deepEqual(log, expected, 'log messages are correct.');

  t.equal(remoteLicense.fetch(url), null, 'null returned.');
  t.end();
});

test('Returns JSON if http resource is found.', (t) => {
  t.plan(1);
  const requestStub = function (method, url) {
    return {
      statusCode: 200,
      body: `{ "name": "something"}`
    };
  };

  const remoteLicense = proxyquire('../lib/remote-license.js',
  { 'sync-request': requestStub });

  const json = remoteLicense.fetch(url);
  t.equal(json.name, 'something', 'JSON returned.');
  t.end();
});
