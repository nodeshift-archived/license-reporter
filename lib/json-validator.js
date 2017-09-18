'use strict';

const Validator = require('jsonschema').Validator;
const reader = require('./file-reader.js');

const schema = {
  'type': 'object',
  'properties': {
    'fedora_abbrev': {'type': 'string'},
    'fedora_name': {'type': 'string'},
    'id': {'type': 'string'},
    'license_text': {'type': 'string'},
    'approved': {'type': 'string'},
    'spdx_abbrev': {'type': 'string'},
    'spdx_name': {'type': 'string'},
    'url': {'type': 'string'}
  }
};

function validateUnifiedList (unifiedListPath) {
  const v = new Validator();
  const unifiedList = reader.readAsJson(unifiedListPath);
  const errors = [];
  for (const e in unifiedList) {
    errors.push(v.validate(unifiedList[e], schema).errors.map(e => `Item: ${e.instance} - ${e.stack}`));
  }
  const errorsFlattened = errors.reduce((a, b) => { return a.concat(b); }, []);
  if (errorsFlattened.length > 0) {
    errorsFlattened.forEach(e => {
      console.log(e);
    });
  }
}

module.exports = {
  validateUnifiedList
};

