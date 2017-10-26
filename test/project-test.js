'use strict';

const test = require('tape');
const project = require('../lib/project');

test('Checks if project has node modules.', (t) => {
  t.plan(2);
  t.ok(project.hasNodeModules(process.cwd()), `project has node modules.`);
  t.notOk(project.hasNodeModules('foo'), `project has no modules.`);
  t.end();
});
