'use strict';

const test = require('blue-tape');
const fs = require('fs');
const path = require('path');
const writer = require('../lib/file-writer.js');

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
  t.equal(fs.existsSync('foo.xml'), true, 'foo.xml file created.');
  fs.unlinkSync('foo.xml');
  t.end();
});

test('Should create HTML file.', (t) => {
  const options = {css: path.join(__dirname, '../lib/resources/licenses.css')};
  options.directory = process.cwd();
  return Promise.resolve(writer.createHtml(options, xmlObject))
  .then(() => {
    t.equal(fs.existsSync('license.html'), true, 'HTML file created.');
    fs.unlink('license.html', () => {});
    fs.unlink('licenses.css', () => {});
  });
});

test('Should merge XMLs.', (t) => {
  writer.createXml({xml: 'foo.xml', silent: true}, xmlObject);
  writer.createXml({xml: 'bar.xml', silent: true}, xmlObject);
  const options = {mergeProductName: 'fooBar', mergeXmls: 'foo.xml,bar.xml', mergeOutput: 'fooBar.xml'};
  return Promise.resolve(writer.mergeXmls(options))
  .then(() => {
    t.equal(fs.access('fooBar.xml', (err) => { if (!err) return true; }, true));
    fs.unlink('foo.xml', () => {});
    fs.unlink('bar.xml', () => {});
    setTimeout(() => fs.unlink('fooBar.xml', () => {}), 1000);
  });
});
