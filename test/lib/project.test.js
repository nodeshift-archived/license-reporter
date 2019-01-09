'use strict';

/* eslint-env jest */

const cwd = process.cwd();
const project = require('../../lib/utils/project');

test('Checks if project has metadata.', () => {
  expect.assertions(5);
  const metaData = project.projectMetaData(cwd);
  expect(metaData).toBeDefined();
  expect(metaData.hasOwnProperty('project')).toBeTruthy();
  expect(metaData.hasOwnProperty('version')).toBeTruthy();
  expect(metaData.hasOwnProperty('license')).toBeTruthy();
  expect(metaData.hasOwnProperty('dependencies')).toBeTruthy();
});
