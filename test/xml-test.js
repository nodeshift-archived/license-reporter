'use strict';

const test = require('tape');
const xml = require('../lib/xml.js');

test('Should parse object', (t) => {
  t.plan(1);
  const obj = xml.parse('something', {one: 1, two: 2});
  t.equal(obj, '<?xml version=\'1.0\'?>\n<something>\n    <one>1</one>\n    <two>2</two>\n</something>');
  t.end();
});

test('Should generate JSON from xml', (t) => {
  t.plan(2);
  const project1 = {
    name: 'project1',
    licenses: {
      license: [
        {name: 'projectDep1', version: '1.0', licenses: 'MIT', file: '...'}
      ]
    }
  };
  const projectXml = xml.parse('project1', project1.licenses);
  xml.toJson(projectXml).then(result => {
    t.ok(result.project1, 'should have project1 property');
    t.ok(result.project1.license, 'should have licence array');
    t.end();
  }).catch(e => {
    t.error(e);
    t.fail();
  });
});

test('Should throw error if invalid xml', (t) => {
  t.plan(1);
  xml.toJson('bogus').then(result => {
    t.fail();
  }).catch(e => {
    t.ok(e, 'promise should be rejected is xml is invalid');
    t.end();
  });
});

test('Should generate JSON Array from xmls', (t) => {
  t.plan(1);
  const project1 = {
    name: 'project1',
    licenses: {
      license: [
        {name: 'projectDep1', version: '1.0', licenses: 'MIT', file: '...'}
      ]
    }
  };
  const project2 = {
    name: 'project2',
    licenses: {
      license: [
        {name: 'projectDep2', version: '2.0', licenses: 'AST', file: '...'}
      ]
    }
  };
  const xml1 = xml.parse('project1', project1.licenses);
  const xml2 = xml.parse('project2', project2.licenses);
  const xmls = [xml1, xml2];
  xml.toJsonArray(xmls).then(jsons => {
    t.equal(jsons.length, 2, 'should have created two json entries');
    t.end();
  }).catch(e => {
    t.error(e);
    t.fail();
  });
});

test('Should generate JSON Array from xmls', (t) => {
  t.plan(1);
  const xmls = ['bogus1', 'bogus2'];
  xml.toJsonArray(xmls).then(jsons => {
    t.fail();
  }).catch(e => {
    t.ok(e, 'promise should have been rejected if xml were invalid');
    t.end();
  });
});

test('Should merge xmls', (t) => {
  t.plan(1);
  const project1 = {
    name: 'project1',
    licenses: {
      license: [
        {name: 'projectDep1', version: '1.0', licenses: 'MIT', file: '...'}
      ]
    }
  };
  const project2 = {
    name: 'project2',
    licenses: {
      license: [
        {name: 'projectDep2', version: '2.0', licenses: 'AST', file: '...'}
      ]
    }
  };
  const expected = String.raw`<?xml version='1.0'?>
<productName>
    <project>
        <project1>
            <license>
                <name>projectDep1</name>
                <version>1.0</version>
                <licenses>MIT</licenses>
                <file>...</file>
            </license>
        </project1>
    </project>
    <project>
        <project2>
            <license>
                <name>projectDep2</name>
                <version>2.0</version>
                <licenses>AST</licenses>
                <file>...</file>
            </license>
        </project2>
    </project>
</productName>`;
  const xml1 = xml.parse('project1', project1.licenses);
  const xml2 = xml.parse('project2', project2.licenses);
  const xmls = [xml1, xml2];
  const product = {
    name: 'productName',
    projects: {
      project: []
    }
  };
  xml.merge(product.name, xmls).then(result => {
    t.equal(result, expected, 'merged xmls should follow correct structure');
    t.end();
  }).catch(e => {
    t.error(e);
    t.fail();
  });
});
