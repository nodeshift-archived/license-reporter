'use strict';

const test = require('tape');
const warnings = require('../lib/warnings.js');
const stdout = require('test-console').stdout;

test('Should report the correct warning.', (t) => {
  t.plan(1);
  const expected = ['========= WARNING WHITE-LISTED LICENSES ==========\n',
    'name: testProject, version: 1.2, licenses: MIT,Bogus,ASL 1.1,UNKNOWN\n',
    '========= WARNING WHITE-LISTED LICENSES ==========\n'];
  const project = {
    dependencies: {
      dependency: [
        {
          packageName: 'testProject',
          version: '1.2',
          licenses: {
            license: [
             {name: 'MIT', url: '...'},
             {name: 'Bogus', url: '...'},
             {name: 'ASL 1.1', url: '...'},
             {name: 'ASL 1.1', url: 'UNKNOWN'}
            ]
          }
        }
      ]
    }
  };
  const whitelist = [{'name': 'ASL 1.1'}];
  const log = stdout.inspectSync(() => warnings.print(require('../lib/whitelist.js')(whitelist).check(project),
                 'WHITE-LISTED'));
  t.deepEqual(log, expected);
  t.end();
});

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
