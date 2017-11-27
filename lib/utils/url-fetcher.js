'use strict';

const syncRequest = require('sync-request');

const fetch = (url) => {
  const res = syncRequest('GET', url);
  if (res.statusCode === 200) {
    return JSON.parse(res.body.toString());
  } else {
    console.error(`Could not get resource: ${url}`);
    console.error(`StatusCode returned was: ${res.statusCode}`);
    return null;
  }
};

module.exports = {
  fetch
};
