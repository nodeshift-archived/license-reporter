'use strict';

const test = require('blue-tape');
const cwd = process.cwd();
const checker = require('../../lib/modules/checker');

const numNycDeps = json => json.filter(d => d.dependency.startsWith('nyc@')).length;

test('Checks licenses.', (t) => {
  t.plan(5);
  return checker.check(cwd)
  .then((json) => {
    t.ok(json, `The json has content.`);
    t.ok(json[0].hasOwnProperty('dependency'), `The json has dependency property.`);
    t.ok(json[0].hasOwnProperty('licenses'), `The json has licenses property.`);
    t.ok(json[0].hasOwnProperty('file'), `The json has file property.`);
    t.ok(numNycDeps(json) > 0, `Contains devDependency 'nyc'`);
  })
  .catch((e) => {
    console.error(e);
    t.fail(e);
  });
});

test('Checks licenses with production-only argument.', (t) => {
  t.plan(5);
  return checker.check(cwd, true)
    .then((json) => {
      t.ok(json, `The json has content.`);
      t.ok(json[0].hasOwnProperty('dependency'), `The json has dependency property.`);
      t.ok(json[0].hasOwnProperty('licenses'), `The json has licenses property.`);
      t.ok(json[0].hasOwnProperty('file'), `The json has file property.`);
      t.ok(numNycDeps(json) === 0, `Doesn't contain devDependency 'nyc'`);
    })
    .catch((e) => {
      console.error(e);
      t.fail(e);
    });
});
