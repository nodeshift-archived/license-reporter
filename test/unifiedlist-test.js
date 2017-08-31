'use strict';

const test = require('tape');
const stdout = require('test-console').stdout;

test('Should warn if license is not not approved', (t) => {
  t.plan(1);
  const expected = ['========= APPROVED LICENSES        ==========\n',
    'name: testProject , version: 1.0.0 , licenses: MIT\n',
    '========= APPROVED LICENSES        ==========\n',
    '========= NOT APPROVED LICENSES    ==========\n',
    'name: notapproved , version: 2.0.0 , licenses: 9wm License (Original)\n',
    '========= NOT APPROVED LICENSES    ==========\n'];
  const project = {
    dependencies: {
      dependency: [
        {
          packageName: 'testProject',
          version: '1.0.0',
          licenses: {
            license: [
              {name: 'MIT', url: '...'}
            ]
          }
        },
        {
          packageName: 'notapproved',
          version: '2.0.0',
          licenses: {
            license: [
              {name: '9wm License (Original)', url: '...'}
            ]
          }
        }
      ]
    }
  };
  const log = stdout.inspectSync(() => {
    require('../lib/unifiedlist.js').check(project);
  });
  t.deepEqual(log, expected);
  t.end();
});
