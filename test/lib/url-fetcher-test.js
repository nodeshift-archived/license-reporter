'use strict';

const test = require('tape');
const proxyquire = require('proxyquire');
const stderr = require('test-console').stderr;

const url = 'http://bogus.com/namemap.json';

test('Returns null if http resource not found.', (t) => {
  t.plan(2);
  const requestStub = function (method, url) {
    return { statusCode: 404 };
  };

  const fetcher = proxyquire('../../lib/utils/url-fetcher.js',
    { 'sync-request': requestStub });

  const expected = ['Could not get resource: http://bogus.com/namemap.json\n',
    'StatusCode returned was: 404\n'];
  const log = stderr.inspectSync(() => fetcher.fetch(url));
  t.deepEqual(log, expected, 'log messages are correct.');
  stderr.inspect();
  t.equal(fetcher.fetch(url), null, 'null returned.');
  stderr.inspect().restore();
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

  const fetcher = proxyquire('../../lib/utils/url-fetcher.js',
    { 'sync-request': requestStub });

  const json = fetcher.fetch(url);
  t.equal(json.name, 'something', 'JSON returned.');
  t.end();
});
