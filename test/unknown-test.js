'use strict';

const test = require('tape');

test('Should warn if license is unknown', (t) => {
  t.plan(3);
  const project = {
    dependencies: {
      dependency: [
        {
          packageName: 'test1',
          version: '1.0.0',
          licenses: {
            license: [
              {name: 'MIT', url: 'something'},
              {name: '', url: ''},
              {name: 'unknown', url: ''},
              {name: 'UNKNOWN', url: ''},
              {name: undefined, url: undefined},
              {name: ['MIT', 'APACHE'], url: 'something'},
              {name: ['unknown'], url: 'something'},
              {name: ['MIT', 'unknown'], url: 'something'},
              {name: 'Custom: https://something', url: 'something'},
              {name: ['Custom: https://something'], url: 'something'},
              {name: 'Apache-2.0', url: undefined}
            ]
          }
        },
        {
          packageName: 'test2',
          version: '1.2.3',
          licenses: {
            license: [
              {name: 'MIT', url: 'something'}
            ]
          }
        }
      ]
    }
  };
  const unknown = require('../lib/unknown.js').check(project);
  t.equal(unknown.length, 1);
  t.equal(unknown[0].packageName, 'test1');
  t.equal(unknown[0].licenses.license.length, 11);
  t.end();
});
