'use strict';

const test = require('blue-tape');
const fs = require('fs');
const path = require('path');
const writer = require('../lib/file-writer.js');

const licensesDir = path.join(process.cwd(), 'licenses');
writer.createLicenseDir();

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

test('Should create foo.xml.', (t) => {
  writer.createXml({xml: 'foo.xml', silent: true}, xmlObject);
  t.equal(fs.existsSync(path.join(licensesDir, 'foo.xml')), true, 'foo.xml file created.');
  fs.unlinkSync(path.join(licensesDir, 'foo.xml'));
  t.end();
});

test('Should create HTML file.', (t) => {
  const options = {css: path.join(__dirname, '../lib/resources/licenses.css')};
  options.directory = process.cwd();
  const dependencyLicenseFiles = [];
  const foo = {
    name: 'testProject',
    type: 'MIT',
    file: 'foo-path-of-the-license-file'
  };
  dependencyLicenseFiles.push(foo);
  return Promise.resolve(writer.createHtml(options, xmlObject, dependencyLicenseFiles))
  .then(() => {
    t.equal(fs.existsSync(path.join(licensesDir, 'license.html')), true, 'HTML file created.');
    fs.unlink(path.join(licensesDir, 'license.html'), () => {});
    fs.unlink(path.join(licensesDir, 'licenses.css'), () => {});
  });
});

test('Should merge XML files.', (t) => {
  writer.createXml({xml: 'foo.xml', silent: true}, xmlObject);
  writer.createXml({xml: 'bar.xml', silent: true}, xmlObject);
  const options = {mergeProductName: 'fooBar', mergeXmls: 'licenses/foo.xml,licenses/bar.xml', mergeOutput: 'fooBar.xml'};
  return Promise.resolve(writer.mergeXmls(options))
  .then(() => {
    t.equal(fs.access('fooBar.xml', (err) => { if (!err) return true; }, true));
    fs.unlink(path.join(licensesDir, 'foo.xml'), () => {});
    fs.unlink(path.join(licensesDir, 'bar.xml'), () => {});
    setTimeout(() => fs.unlink(path.join(licensesDir, 'fooBar.xml'), () => {}), 500);
    setTimeout(() => fs.rmdir(licensesDir, () => {}), 500);
  });
});

test('Should create a JSON file.', (t) => {
  writer.createJson({json: 'foo.json'}, xmlObject);
  t.equal(fs.existsSync(path.join(licensesDir, 'foo.json')), true, 'foo.json file created.');
  fs.unlinkSync(path.join(licensesDir, 'foo.json'));
  t.end();
});

test('Should create a YAML file.', (t) => {
  writer.createYaml({yaml: 'foo.yaml'}, xmlObject);
  t.equal(fs.existsSync(path.join(licensesDir, 'foo.yaml')), true, 'foo.yaml file created.');
  fs.unlinkSync(path.join(licensesDir, 'foo.yaml'));
  t.end();
});
