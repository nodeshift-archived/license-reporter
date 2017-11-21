'use strict';

const test = require('tape');
const html = require('../../lib/modules/html.js');

test('Should generate html from xml', (t) => {
  t.plan(1);
  const project2 = {
    project: 'szero',
    version: '1.0.0',
    dependencies: {
      dependency: [
        { packageName: 'node-builtins',
          version: '0.1.1',
          licenses: {
            license: [
              { name: 'Apache License 2.0',
                url: 'Foo' }
            ]
          }
        },
        {
          packageName: 'roi',
          version: '0.15.0',
          licenses: {
            license: [
              { name: 'UNKNOWN', url: 'UNKNOWN' }
            ]
          }
        }
      ]
    }
  };

  html.parse(project2).then(output => {
    const expected = String.raw`<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<link rel="stylesheet" type="text/css" href="licenses.css">
</head>
<body>
<h2>szero</h2>
<table>
<tr>
<th>Package Group</th>
<th>Package Artifact</th>
<th>Package Version</th>
<th>Remote Licenses</th>
<th>Local Licenses</th>
</tr>
<tr>
<td>N/A</td>
<td>node-builtins</td>
<td>0.1.1</td>
<td>Foo</td>
<td><a href=></a></td>
</tr>
<tr>
<td>N/A</td>
<td>roi</td>
<td>0.15.0</td>
<td>UNKNOWN</td>
<td><a href=></a></td>
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
