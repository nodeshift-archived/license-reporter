'use strict';

/* eslint-env jest */

const messages = require('../../lib/utils/messages.js');

let outputData = '';
const storeLog = inputs => (outputData += inputs);
test('Should report the correct unknown warning.', () => {
  console.log = jest.fn(storeLog);
  const expected = '========= WARNING UNKNOWN LICENSES ==========name: test2, version: 1.2, licenses: UNKNOWN========= WARNING UNKNOWN LICENSES ==========';
  const project = {
    dependencies: {
      dependency: [
        {
          packageName: 'test2',
          version: '1.2',
          licenses: {
            license: [
              { name: 'Apache-2.0', url: 'UNKNOWN' }
            ]
          }
        }
      ]
    }
  };
  messages.warning(require('../../lib/utils/unknown.js').check(project), 'UNKNOWN');
  expect(outputData).toBe(expected);
});
