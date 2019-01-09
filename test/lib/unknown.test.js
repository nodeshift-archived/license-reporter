'use strict';

/* eslint-env jest */

test('Should warn if license is unknown', () => {
  expect.assertions(3);
  const project = {
    dependencies: {
      dependency: [
        {
          packageName: 'test1',
          version: '1.0.0',
          licenses: {
            license: [
              { name: 'MIT', url: 'something' },
              { name: '', url: '' },
              { name: 'unknown', url: '' },
              { name: 'UNKNOWN', url: '' },
              { name: undefined, url: undefined },
              { name: ['MIT', 'APACHE'], url: 'something' },
              { name: ['unknown'], url: 'something' },
              { name: ['MIT', 'unknown'], url: 'something' },
              { name: 'Custom: https://something', url: 'something' },
              { name: ['Custom: https://something'], url: 'something' },
              { name: 'Apache-2.0', url: undefined }
            ]
          }
        },
        {
          packageName: 'test2',
          version: '1.2.3',
          licenses: {
            license: [
              { name: 'MIT', url: 'something' }
            ]
          }
        }
      ]
    }
  };
  const unknown = require('../../lib/utils/unknown.js').check(project);
  expect(unknown.length).toBe(1);
  expect(unknown[0].packageName).toBe('test1');
  expect(unknown[0].licenses.license.length).toBe(11);
});
