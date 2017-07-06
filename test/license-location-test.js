'use strict';

const test = require('tape');
const path = require('path');
const checker = require('license-checker');

function check (dir) {
  return new Promise((resolve, reject) => {
    checker.init({ start: path.join(__dirname, dir) }, (err, json) => {
      if (err) {
        reject(err);
      } else {
        resolve(json);
      }
    });
  });
}

test('Should find the license file.', (t) => {
  t.plan(1);
  check('/fixtures/all').then((json) => {
    t.ok(json['sample_dependency@1.0.0'].licenseFile, `The license file is: ${json['sample_dependency@1.0.0'].licenseFile}`);
    t.end();
  }).catch((error) => {
    t.fail(error);
  });
});

test('Should find inside the LICENSE.', (t) => {
  t.plan(1);
  check('/fixtures/license').then((json) => {
    t.ok(json['sample_dependency@1.0.0'].licenseFile.includes('LICENSE'), `LICENSE file found`);
    t.end();
  }).catch((error) => {
    t.fail(error);
  });
});

test('Should find inside the COPYING.', (t) => {
  t.plan(1);
  check('/fixtures/copying').then((json) => {
    t.ok(json['sample_dependency@1.0.0'].licenseFile.includes('COPYING'), `COPYING file found`);
    t.end();
  }).catch((error) => {
    t.fail(error);
  });
});

test('Should find inside the README.', (t) => {
  t.plan(1);
  check('/fixtures/readme').then((json) => {
    t.ok(json['sample_dependency@1.0.0'].licenseFile.includes('README'), `README file found`);
    t.end();
  }).catch((error) => {
    t.fail(error);
  });
});
