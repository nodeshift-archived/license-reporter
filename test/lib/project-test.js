'use strict';

const test = require('tape');
const cwd = process.cwd();
const project = require('../../lib/modules/project');

test('Checks if project has metadata.', (t) => {
  t.plan(5);
  const metaData = project.projectMetaData(cwd);
  t.ok(metaData, `project has metadata.`);
  t.ok(metaData.hasOwnProperty('project'), `project has project attribute.`);
  t.ok(metaData.hasOwnProperty('version'), `project has version attribute.`);
  t.ok(metaData.hasOwnProperty('license'), `project has license attribute.`);
  t.ok(metaData.hasOwnProperty('dependencies'), `project has dependencies attribute.`);
  t.end();
});
