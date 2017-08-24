'use strict';

const test = require('tape');

test('Should warn if license is not in whitelist', (t) => {
  t.plan(1);
  const project = {
    name: 'testProject',
    licenses: {
      license: [
        {name: 'test1', version: '1.0', license: 'MIT', file: '...'},
        {name: 'test2', version: '1.2', license: 'Bogus', file: '...'},
        {name: 'test2', version: '1.2', license: 'ASL 1.1', file: '...'},
        {name: 'test2', version: '1.2', license: 'UNKNOWN', file: '...'}
      ]
    }
  };
  const customWhitelist = [{'name': 'MIT'}];
  const whitelist = require('../lib/whitelist.js')(customWhitelist);
  const nok = whitelist.check(project);
  t.equal(nok.length, 1);
  t.end();
});
