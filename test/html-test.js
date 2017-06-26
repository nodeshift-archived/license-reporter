'use strict';

const test = require('tape');
const html = require('../lib/html.js');

test('Should generate html from xml', (t) => {
  t.plan(1);
  const project = {
    name: 'testProject',
    licenses: {
      license: [
        {name: 'test1', version: '1.0', licenses: 'MIT', file: '...'},
        {name: 'test2', version: '1.2', licenses: 'MIT', file: '...'}
      ]
    }
  };
  html.parse(project).then(output => {
    const expected = String.raw`<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<link rel="stylesheet" type="text/css" href="licenses.css">
</head>
<body>
<h2>testProject</h2>
<table>
<tr>
<th>Package Group</th>
<th>Package Artifact</th>
<th>Package Version</th>
<th>Remote Licenses</th>
<th>Local Licenses</th>
</tr>
<tr>
<td>test1</td>
<td>N/A</td>
<td>1.0</td>
<td>MIT</td>
<td>...</td>
</tr>
<tr>
<td>test2</td>
<td>N/A</td>
<td>1.2</td>
<td>MIT</td>
<td>...</td>
</tr>
</table>
</body>
</html>`;
    t.equal(output, expected);
    t.end();
  })
  .catch(e => {
    t.error(e);
    t.fail();
  });
});
