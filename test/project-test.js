'use strict';

const test = require('tape');
const project = require('../lib/project.js');

test('Checks if project has node modules.', (t) => {
  t.plan(1);
  t.ok(project.hasNodeModules(process.cwd()), `project has node modules.`);
  t.end();
});
