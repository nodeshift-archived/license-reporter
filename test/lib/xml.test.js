'use strict';

/* eslint-env jest */

const xml = require('../../lib/utils/xml.js');
const js2xmlparser = require('js2xmlparser');

test('Should generate JSON from xml', async () => {
  expect.assertions(2);
  const project1 = {
    name: 'project1',
    licenses: {
      license: [
        { name: 'projectDep1', version: '1.0', licenses: 'MIT', file: '...' }
      ]
    }
  };
  const projectXml = js2xmlparser.parse('project1', project1.licenses);
  await xml.toJson(projectXml)
    .then(result => {
      expect(result.project1).toBeDefined();
      expect(result.project1.license).toBeDefined();
    }).catch(e => {
      console.error(e);
    });
});

test('Should throw error if invalid xml', async () => {
  let message = false;
  try {
    await xml.toJson('bogus');
  } catch (e) {
    message = e.message;
  }
  expect(message).toBeTruthy();
});

test('Should generate JSON Array from xmls', async () => {
  const project1 = {
    name: 'project1',
    licenses: {
      license: [
        { name: 'projectDep1', version: '1.0', licenses: 'MIT', file: '...' }
      ]
    }
  };
  const project2 = {
    name: 'project2',
    licenses: {
      license: [
        { name: 'projectDep2', version: '2.0', licenses: 'AST', file: '/path/node_modules/projectDep2/LICENSE.txt' }
      ]
    }
  };
  const xml1 = js2xmlparser.parse('project1', project1.licenses);
  const xml2 = js2xmlparser.parse('project2', project2.licenses);
  const xmls = [xml1, xml2];
  await xml.toJsonArray(xmls)
    .then(jsons => {
      expect(jsons.length).toBe(2);
    }).catch(e => {
      console.error(e);
    });
});

test('Should generate JSON Array from xmls', async () => {
  const xmls = ['bogus1', 'bogus2'];
  let message = false;
  try {
    await xml.toJsonArray(xmls);
  } catch (e) {
    message = e.message;
  }
  expect(message).toBeTruthy();
});

test('Should merge xmls', async () => {
  const project1 = {
    name: 'project1',
    licenses: {
      license: [
        { name: 'projectDep1', version: '1.0', licenses: 'MIT', file: '...' }
      ]
    }
  };
  const project2 = {
    name: 'project2',
    licenses: {
      license: [
        { name: 'projectDep2', version: '2.0', licenses: 'AST', file: '/path/node_modules/projectDep2/LICENSE.txt' }
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
  await xml.merge(product.name, xmls)
    .then(result => {
      expect(result).toBe(expected);
    }).catch(e => {
      console.error(e);
    });
});
