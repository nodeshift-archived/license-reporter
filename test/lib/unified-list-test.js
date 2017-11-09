'use strict';

const rewire = require('rewire');
const test = require('tape');
const path = require('path');
const stdout = require('test-console').stdout;
const stderr = require('test-console').stderr;
const unifiedList = require('../../lib/modules/unified-list.js');
const unifiedListJSON = require('../../lib/modules/resources/default-unified-list.json');
const rewired = rewire('../../lib/modules/unified-list.js');
const getLicenses = rewired.__get__('getLicenses');
const findApproved = rewired.__get__('findApproved');
const findNotApproved = rewired.__get__('findNotApproved');

const xmlObject = {
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
        packageName: 'notApproved',
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

test('Should get the licenses from xmlObject', (t) => {
  t.plan(3);
  const licenses = getLicenses(xmlObject);
  t.equal(licenses.length, 2);
  t.equal(licenses[0].license, 'MIT');
  t.equal(licenses[1].license, '9wm License (Original)');
  t.end();
});

test('Should get approved only from xmlObject based on unified list', (t) => {
  t.plan(1);
  const licenses = getLicenses(xmlObject);
  const approvedList = [];
  Object.keys(unifiedListJSON).forEach(key => {
    if (unifiedListJSON[key].approved === 'yes') {
      approvedList.push(unifiedListJSON[key]);
    }
  });
  const approved = findApproved(approvedList, licenses);
  t.equal(Array.from(approved)[0].license, 'MIT');
  t.end();
});

test('Should get not approved only from xmlObject based on unified list', (t) => {
  t.plan(1);
  const licenses = getLicenses(xmlObject);
  const notApprovedList = [];
  Object.keys(unifiedListJSON).forEach(key => {
    if (unifiedListJSON[key].approved !== 'yes') {
      notApprovedList.push(unifiedListJSON[key]);
    }
  });
  const notApproved = findNotApproved(notApprovedList, licenses);
  t.equal(Array.from(notApproved)[0].license, '9wm License (Original)');
  t.end();
});

test('Should print approved and not approved licenses', (t) => {
  t.plan(1);
  const expected = ['========= APPROVED LICENSES        ==========\n',
    'name: testProject , version: 1.0.0 , licenses: MIT\n',
    '========= APPROVED LICENSES        ==========\n',
    '========= NOT APPROVED LICENSES    ==========\n',
    'name: notApproved , version: 2.0.0 , licenses: 9wm License (Original)\n',
    '========= NOT APPROVED LICENSES    ==========\n'];
  const options = {unifiedList: path.join(__dirname, '../../lib/modules/resources/default-unified-list.json')};
  unifiedList.load(options.unifiedList);
  const log = stdout.inspectSync(() => {
    unifiedList.check(xmlObject);
  });
  t.deepEqual(log, expected);
  t.end();
});

test('Should return url for the specified license name', (t) => {
  t.plan(5);
  const options = {unifiedList: path.join(__dirname, '../../lib/modules/resources/default-unified-list.json')};
  unifiedList.load(options.unifiedList);
  t.equal(unifiedList.urlForName('3dfx Glide License'),
      'http://www.users.on.net/~triforce/glidexp/COPYING.txt');
  t.equal(unifiedList.urlForName('4Suite Copyright License'), '');
  t.equal(unifiedList.urlForName('UNKNOWN'), 'UNKNOWN');
  const result = unifiedList.urlForName('bogus');
  t.equal(result, 'UNKNOWN');
  const expected = ['No URL was found for [bogus]\n'];
  const log = stderr.inspectSync(() => unifiedList.urlForName('bogus'));
  t.deepEqual(log, expected);
  t.end();
});

test('urlForName should be able to handle comma separated names', (t) => {
  t.plan(1);
  const options = {unifiedList: path.join(__dirname, '../../lib/modules/resources/default-unified-list.json')};
  unifiedList.load(options.unifiedList);
  t.equal(unifiedList.urlForName('3dfx Glide License, UNKNOWN'),
      'http://www.users.on.net/~triforce/glidexp/COPYING.txt, UNKNOWN');
  t.end();
});
