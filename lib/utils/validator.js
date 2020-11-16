'use strict';

const Validator = require('jsonschema').Validator;
const fileReader = require('./file-reader');

const schema = {
  type: 'object',
  properties: {
    fedora_abbrev: { type: 'string' },
    fedora_name: { type: 'string' },
    id: { type: 'string' },
    license_text: { type: 'string' },
    approved: { type: 'string' },
    spdx_abbrev: { type: 'string' },
    spdx_name: { type: 'string' },
    url: { type: 'string' }
  }
};

const validate = (json) => {
  const v = new Validator();
  const list = fileReader.readAsJson(json);
  const errors = [];
  for (const l in list) {
    const error = v.validate(list[l], schema)
      .errors.map(e => `Item: ${e.instance} - ${e.stack}`);
    if (Object.keys(list[l]).length !== 8) {
      errors.push(`Item: ${l} - Don't have the correct number of attributes.`);
    }
    errors.push(error);
  }
  const errorsFlattened = errors.reduce((a, b) => a.concat(b), []);
  if (errorsFlattened.length > 0) {
    console.log('The unified list you provided has errors:');
    errorsFlattened.forEach(e => {
      console.error(e);
    });
  }
};

module.exports = {
  validate
};
