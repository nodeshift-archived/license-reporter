'use strict';

const test = require('tape');
const project = require('../lib/project');
const util = require('../lib/util');

test('Checks if project has node modules.', (t) => {
  t.plan(2);
  t.ok(project.hasNodeModules(util.currentDir()), `project has node modules.`);
  t.notOk(project.hasNodeModules('foo'), `project has no modules.`);
  t.end();
});
