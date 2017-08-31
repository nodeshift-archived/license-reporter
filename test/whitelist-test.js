'use strict';

const test = require('tape');

test('Should warn if license is not in whitelist', (t) => {
  t.plan(1);
  const project = {
    dependencies: {
      dependency: [
        {
          packageName: 'testProject',
          version: '1.0.0',
          licenses: {
            license: [
              {name: 'MIT', url: '...'},
              {name: 'Bogus', url: '...'},
              {name: 'ASL 1.1', url: '...'},
              {name: 'UNKNOWN', url: '...'},
              {name: 'Apache-2.0', url: 'UNKNOWN'}
            ]
          }
        }
      ]
    }
  };
  const customWhitelist = [{'name': 'MIT'}];
  const whitelist = require('../lib/whitelist.js')(customWhitelist);
  const nok = whitelist.check(project);
  t.equal(nok.length, 1);
  t.end();
});
