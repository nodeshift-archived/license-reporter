'use strict';

const test = require('tape');
const xml = require('../lib/xml.js');

test('Should parse object', (t) => {
  t.plan(1);
  const obj = xml.parse('something', {one: 1, two: 2});
  t.equal(obj, '<?xml version=\'1.0\'?>\n<something>\n    <one>1</one>\n    <two>2</two>\n</something>');
  t.end();
});
