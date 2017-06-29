'use strict';

const test = require('tape');

test('Should warn if license is not in blacklist', (t) => {
  t.plan(1);
  const project = {
    name: 'testProject',
    licenses: {
      license: [
        {name: 'test1', version: '1.0', license: 'MIT', file: '...'},
        // The following is one of the licenses in the default black list
        {name: 'test2', version: '1.2', license: 'AT&T Public License', file: '...'},
        {name: 'test2', version: '1.2', license: 'ASL 1.1 ', file: '...'}
      ]
    }
  };
  const customBlacklist = [{'name': 'ASL 1.1'}];
  const blacklist = require('../lib/blacklist.js')(customBlacklist);
  const nok = blacklist.check(project);
  t.equal(nok.length, 2);
  t.end();
});

test('Should return empty array if nothing is found', (t) => {
  t.plan(1);
  const project = {
    name: 'testProject',
    licenses: {
      license: [
        {name: 'test1', version: '1.0', license: 'MIT', file: '...'}
      ]
    }
  };
  const blacklist = require('../lib/blacklist.js')();
  const nok = blacklist.check(project);
  t.equal(nok.length, 0);
  t.end();
});
