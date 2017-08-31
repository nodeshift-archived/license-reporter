'use strict';

const test = require('tape');

test('Should warn if license is not in blacklist', (t) => {
  t.plan(7);
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
          packageName: 'defaultBlackList',
          version: '2.0.0',
          licenses: {
            license: [
              {name: 'AT&T Public License', url: '...'}
            ]
          }
        },
        {
          packageName: 'customBlackList',
          version: '3.0.0',
          licenses: {
            license: [
              {name: 'ASL 1.1 ', url: '...'}
            ]
          }
        }
      ]
    }
  };
  const customBlacklist = [{'name': 'ASL 1.1'}];
  const blacklist = require('../lib/blacklist.js')(customBlacklist);
  const nok = blacklist.check(project);
  t.equal(nok.length, 2);
  t.strictEquals(nok[0].packageName, 'defaultBlackList');
  t.strictEquals(nok[0].version, '2.0.0');
  t.equal(nok[0].licenses.license.length, 1);
  t.strictEquals(nok[1].packageName, 'customBlackList');
  t.strictEquals(nok[1].version, '3.0.0');
  t.equal(nok[1].licenses.license.length, 1);
  t.end();
});

test('Should return empty array if nothing is found', (t) => {
  t.plan(1);
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
        }
      ]
    }
  };
  const blacklist = require('../lib/blacklist.js')();
  const nok = blacklist.check(project);
  t.equal(nok.length, 0);
  t.end();
});
