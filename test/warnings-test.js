'use strict';

const test = require('tape');
const warnings = require('../lib/warnings.js');
const stdout = require('test-console').stdout;

test('Should report the correct unknown warning.', (t) => {
  t.plan(1);
  const expected = ['========= WARNING UNKNOWN LICENSES ==========\n',
    'name: test2, version: 1.2, licenses: UNKNOWN\n',
    '========= WARNING UNKNOWN LICENSES ==========\n'];
  const project = {
    dependencies: {
      dependency: [
        {
          packageName: 'test2',
          version: '1.2',
          licenses: {
            license: [
             {name: 'Apache-2.0', url: 'UNKNOWN'}
            ]
          }
        }
      ]
    }
  };
  const log = stdout.inspectSync(() => warnings.print(require('../lib/unknown.js').check(project),
                 'UNKNOWN'));
  t.deepEqual(log, expected);
  t.end();
});
