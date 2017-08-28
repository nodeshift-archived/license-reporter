'use strict';

const test = require('tape');

test('Should warn if license is unknown', (t) => {
  t.plan(1);
  const project = {
    name: 'testProject',
    licenses: {
      license: [
        {name: 'test1', version: '1.0', license: 'MIT', file: 'something'},
        {name: 'test2', version: '1.0', license: '', file: ''},
        {name: 'test3', version: '1.0', license: 'unknown', file: ''},
        {name: 'test4', version: '1.0', license: 'UNKNOWN', file: ''},
        {name: 'test5', version: '1.2', license: undefined, file: undefined},
        {name: 'test6', version: '1.0', license: ['MIT', 'APACHE'], file: 'something'},
        {name: 'test7', version: '1.0', license: ['unknown'], file: 'something'},
        {name: 'test8', version: '1.0', license: ['MIT', 'unknown'], file: 'something'},
        {name: 'test9', version: '1.0', license: 'Custom: https://something', file: 'something'},
        {name: 'test10', version: '1.0', license: ['Custom: https://something'], file: 'something'},
        {name: 'test11', version: '1.0-10', license: 'Apache-2.0', file: undefined}
      ]
    }
  };
  const unknown = require('../lib/unknown.js').check(project);
  t.equal(unknown.length, 9);
  t.end();
});
