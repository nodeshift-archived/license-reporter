'use strict';

const test = require('tape');
const html = require('../lib/html.js');

test('Should generate html from xml', (t) => {
  t.plan(1);
  const licenseInfo = {
    licenses: {
      license: [
        {name: 'test1', version: '1.0', licenses: 'MIT', file: '...'},
        {name: 'test2', version: '1.2', licenses: 'MIT', file: '...'}
      ]
    }
  };
  const output = html.parse(licenseInfo);
  t.equal(output.trim(), '<b>test1</b>\n<b>1.0</b>\n<b>MIT</b>\n<b>...</b>\n<b>test2</b>\n<b>1.2</b>\n<b>MIT</b>\n<b>...</b>');
  t.end();
});
