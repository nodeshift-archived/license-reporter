'use strict';

const test = require('tape');
const warnings = require('../lib/warnings.js');
const stdout = require('test-console').stdout;

test('Should report the correct warning.', (t) => {
  t.plan(1);
  const expected = ['========= WARNING WHITE-LISTED LICENSES ==========\n',
    'name: test2, version: 1.2, licenses: Bogus\n',
    '========= WARNING WHITE-LISTED LICENSES ==========\n'];
  const project = {
    name: 'testProject',
    licenses: {
      license: [
       {name: 'test1', version: '1.0', license: 'MIT', file: '...'},
       {name: 'test2', version: '1.2', license: 'Bogus', file: '...'},
       {name: 'test2', version: '1.2', license: 'ASL 1.1', file: '...'},
       {name: 'test4', version: '1.2', license: 'ASL 1.1', file: 'UNKNOWN'}
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
    'name: test2, version: 1.2, licenses: Apache-2.0, file: UNKNOWN\n',
    '========= WARNING UNKNOWN LICENSES ==========\n'];
  const project = {
    name: 'testProject',
    licenses: {
      license: [
       {name: 'test1', version: '1.2', license: 'ASL 1.1', file: '...'},
       {name: 'test2', version: '1.2', license: 'Apache-2.0', file: 'UNKNOWN'}
      ]
    }
  };

  const log = stdout.inspectSync(() => warnings.print(require('../lib/unknown.js').check(project),
                 'UNKNOWN'));
  t.deepEqual(log, expected);
  t.end();
});
