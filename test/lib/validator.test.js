'use strict';

/* eslint-env jest */

const { join } = require('path');
const validator = require('../../lib/utils/validator');

let outputData = '';
const storeLog = inputs => (outputData += inputs);
test('Validates unified list.', () => {
  console.log = jest.fn(storeLog);
  const jsonPath = join(__dirname, '../../lib/utils/resources/default-unified-list.json');
  validator.validate(jsonPath);
  const expected = '';
  expect(outputData).toBe(expected);
});
