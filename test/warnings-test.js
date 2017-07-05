'use strict';

const test = require('tape');
const warnings = require('../lib/warnings.js');
const stdout = require('test-console').stdout;

test('Should report the correct warning.', (t) => {
    t.plan(1);
    const project = {
    name: 'testProject',
    licenses: {
      license: [
        {name: 'test1', version: '1.0', license: 'MIT', file: '...'},
        {name: 'test2', version: '1.2', license: 'Bogus', file: '...'},
        {name: 'test2', version: '1.2', license: 'ASL 1.1', file: '...'}
      ]
    }
  };

  const whitelist = [{'name': 'MIT'}];
  const log = stdout.inspectSync(() => warnings.printWarning(require('../lib/whitelist.js')(whitelist).check(project),
                   'WHITE-LISTED'));
  t.deepEqual(log, [project.licenses.license[0]], 'WHITE');                
  t.end();
});