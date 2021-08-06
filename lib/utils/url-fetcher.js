'use strict';

const axios = require('axios');

const fetch = async (url) => {
  const res = await axios.get(url);
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
