'use strict';

const test = require('tape');
const stdout = require('test-console').stdout;
const unifiedList = require('../lib/unified-list.js');
const unifiedListJSON = require('../lib/resources/default-unified-list.json');

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
  const licenses = unifiedList._getLicensesFromXmlObject(xmlObject);
  t.equal(licenses.length, 2);
  t.equal(licenses[0].license, 'MIT');
  t.equal(licenses[1].license, '9wm License (Original)');
  t.end();
});

test('Should get approved only from xmlObject based on unified list', (t) => {
  t.plan(1);
  const licenses = unifiedList._getLicensesFromXmlObject(xmlObject);
  const approvedList = [];
  Object.keys(unifiedListJSON).forEach(key => {
    if (unifiedListJSON[key].approved === 'yes') {
      approvedList.push(unifiedListJSON[key]);
    }
  });
  const approved = unifiedList._findApproved(approvedList, licenses);
  t.equal(Array.from(approved)[0].license, 'MIT');
  t.end();
});

test('Should get not approved only from xmlObject based on unified list', (t) => {
  t.plan(1);
  const licenses = unifiedList._getLicensesFromXmlObject(xmlObject);
  const notApprovedList = [];
  Object.keys(unifiedListJSON).forEach(key => {
    if (unifiedListJSON[key].approved !== 'yes') {
      notApprovedList.push(unifiedListJSON[key]);
    }
  });
  const notApproved = unifiedList._findNotApproved(notApprovedList, licenses);
  t.equal(Array.from(notApproved)[0].license, '9wm License (Original)');
  t.end();
});

test('Should print approved licenses', (t) => {
  t.plan(1);
  const expected = ['========= APPROVED LICENSES        ==========\n',
    'name: testProject , version: 1.0.0 , licenses: MIT\n',
    '========= APPROVED LICENSES        ==========\n'];

  const licenses = unifiedList._getLicensesFromXmlObject(xmlObject);
  const approvedList = [];
  Object.keys(unifiedListJSON).forEach(key => {
    if (unifiedListJSON[key].approved === 'yes') {
      approvedList.push(unifiedListJSON[key]);
    }
  });
  const approved = unifiedList._findApproved(approvedList, licenses);
  const log = stdout.inspectSync(() => { unifiedList._printApproved(approved); });
  t.deepEqual(log, expected);
  t.end();
});

test('Should print not approved licenses', (t) => {
  t.plan(1);
  const expected = ['========= NOT APPROVED LICENSES    ==========\n',
    'name: notApproved , version: 2.0.0 , licenses: 9wm License (Original)\n',
    '========= NOT APPROVED LICENSES    ==========\n'];

  const licenses = unifiedList._getLicensesFromXmlObject(xmlObject);
  const notApprovedList = [];
  Object.keys(unifiedListJSON).forEach(key => {
    if (unifiedListJSON[key].approved !== 'yes') {
      notApprovedList.push(unifiedListJSON[key]);
    }
  });
  const notApproved = unifiedList._findNotApproved(notApprovedList, licenses);
  const log = stdout.inspectSync(() => { unifiedList._printNotApproved(notApproved); });
  t.deepEqual(log, expected);
  t.end();
});

test('Should print approved and approved licenses', (t) => {
  t.plan(1);
  const expected = ['========= APPROVED LICENSES        ==========\n',
    'name: testProject , version: 1.0.0 , licenses: MIT\n',
    '========= APPROVED LICENSES        ==========\n',
    '========= NOT APPROVED LICENSES    ==========\n',
    'name: notApproved , version: 2.0.0 , licenses: 9wm License (Original)\n',
    '========= NOT APPROVED LICENSES    ==========\n'];
  const log = stdout.inspectSync(() => {
    unifiedList.check(xmlObject);
  });
  t.deepEqual(log, expected);
  t.end();
});

test('Should return url for the specified license name', (t) => {
  t.plan(4);
  t.equal(unifiedList.urlForName('3dfx Glide License'),
      'http://www.users.on.net/~triforce/glidexp/COPYING.txt');
  t.equal(unifiedList.urlForName('4Suite Copyright License'), '');
  t.equal(unifiedList.urlForName('UNKNOWN'), 'UNKNOWN');
  t.throws(() => { unifiedList.urlForName('bogus'); },
      'No URL was found for [bogus]');
  t.end();
});

test('urlForName should be able to handle comma separated names', (t) => {
  t.plan(1);
  t.equal(unifiedList.urlForName('3dfx Glide License, UNKNOWN'),
      'http://www.users.on.net/~triforce/glidexp/COPYING.txt, UNKNOWN');
  t.end();
});
