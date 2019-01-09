'use strict';

/* eslint-env jest */

const rewire = require('rewire');
const path = require('path');

const unifiedList = require('../../lib/utils/unified-list.js');
const unifiedListJSON = require('../../lib/utils/resources/default-unified-list.json');
const rewired = rewire('../../lib/utils/unified-list.js');

const getLicenses = rewired.__get__('getLicenses');
const findApproved = rewired.__get__('findApproved');
const findNotApproved = rewired.__get__('findNotApproved');
const checkName = rewired.__get__('checkName');

const options = { unifiedList: path.join(__dirname, '../../lib/utils/resources/default-unified-list.json') };

const xmlObject = {
  dependencies: {
    dependency: [
      {
        packageName: 'testProject',
        version: '1.0.0',
        licenses: {
          license: [
            { name: 'MIT', url: '...' }
          ]
        }
      },
      {
        packageName: 'notApproved',
        version: '2.0.0',
        licenses: {
          license: [
            { name: '9wm License (Original)', url: '...' }
          ]
        }
      },
      {
        packageName: 'FooBar',
        version: '1.0.0',
        licenses: {
          license: [
            { name: 'UNKNOWN', url: 'UNKNOWN' }
          ]
        }
      },
      {
        packageName: 'BarFoo',
        version: '1.0.0',
        licenses: {
          license: [
            { name: '', url: '' }
          ]
        }
      }
    ]
  }
};

test('Should get the licenses from xmlObject', () => {
  expect.assertions(3);
  const licenses = getLicenses(xmlObject);
  expect(licenses.length).toBe(4);
  expect(licenses[0].license).toBe('MIT');
  expect(licenses[1].license).toBe('9wm License (Original)');
});

test('Should get approved only from xmlObject based on unified list', () => {
  const licenses = getLicenses(xmlObject);
  const approvedList = [];
  Object.keys(unifiedListJSON).forEach(key => {
    if (unifiedListJSON[key].approved === 'yes') {
      approvedList.push(unifiedListJSON[key]);
    }
  });
  const approved = findApproved(approvedList, licenses);
  expect(Array.from(approved)[1].license).toBe('MIT');
});

test('Should get not approved only from xmlObject based on unified list', () => {
  const licenses = getLicenses(xmlObject);
  const notApprovedList = [];
  Object.keys(unifiedListJSON).forEach(key => {
    if (unifiedListJSON[key].approved !== 'yes') {
      notApprovedList.push(unifiedListJSON[key]);
    }
  });
  const notApproved = findNotApproved(notApprovedList, licenses);
  expect(Array.from(notApproved)[0].license).toBe('9wm License (Original)');
});

test('Should return url for the specified license name', () => {
  expect.assertions(5);
  unifiedList.load(options.unifiedList);
  expect(unifiedList.urlForName('3dfx Glide License')).toBe('http://www.users.on.net/~triforce/glidexp/COPYING.txt');
  expect(unifiedList.urlForName('4Suite Copyright License')).toBe('');
  expect(unifiedList.urlForName('UNKNOWN')).toBe('UNKNOWN');
  expect(unifiedList.urlForName('UNKNOWN,UNKNOWN')).toBe('UNKNOWN, UNKNOWN');
  const result = unifiedList.urlForName('bogus');
  expect(result).toBe('UNKNOWN');
});

test('urlForName should be able to handle comma separated names', () => {
  unifiedList.load(options.unifiedList);
  expect(unifiedList.urlForName('3dfx Glide License, UNKNOWN')).toBe(
    'http://www.users.on.net/~triforce/glidexp/COPYING.txt, UNKNOWN');
});

test('Should check the name', () => {
  expect(checkName('UNKNOWN')).toBe('UNKNOWN');
});
