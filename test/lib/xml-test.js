'use strict';

const test = require('tape');
const xml = require('../../lib/utils/xml.js');
const js2xmlparser = require('js2xmlparser');

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
  const projectXml = js2xmlparser.parse('project1', project1.licenses);
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
        {name: 'projectDep2', version: '2.0', licenses: 'AST', file: '/path/node_modules/projectDep2/LICENSE.txt'}
      ]
    }
  };
  const xml1 = js2xmlparser.parse('project1', project1.licenses);
  const xml2 = js2xmlparser.parse('project2', project2.licenses);
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
        {name: 'projectDep2', version: '2.0', licenses: 'AST', file: '/path/node_modules/projectDep2/LICENSE.txt'}
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
                <file>/path/node_modules/projectDep2/LICENSE.txt</file>
            </license>
        </project2>
    </project>
</productName>`;
  const xml1 = js2xmlparser.parse('project1', project1.licenses);
  const xml2 = js2xmlparser.parse('project2', project2.licenses);
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
