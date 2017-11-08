'use strict';

const test = require('blue-tape');
const cwd = process.cwd();
const checker = require('../../lib/modules/checker');

test('Checks licenses.', (t) => {
  t.plan(4);
  return checker.check(cwd)
  .then((json) => {
    t.ok(json, `The json has content.`);
    t.ok(json[0].hasOwnProperty('dependency'), `The json has dependency property.`);
    t.ok(json[0].hasOwnProperty('licenses'), `The json has licenses property.`);
    t.ok(json[0].hasOwnProperty('file'), `The json has file property.`);
  })
  .catch((e) => {
    console.error(e);
    t.fail(e);
  });
});
