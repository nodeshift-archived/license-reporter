'use strict';

const { join } = require('path');
const fs = require('fs');

const xml = require('../utils/xml');

const ldir = join(process.cwd(), 'licenses');

const merge = (mpn, mlx, mo) => {
  const xmls = [];
  mlx.split(',').forEach((file) => {
    if (fs.existsSync(file)) {
      xmls.push(fs.readFileSync(file.trim(), 'utf8'));
    } else {
      console.error(`File not found: ${file}`);
      process.exit(1);
    }
  });
  xml.merge(mpn, xmls).then(result => {
    fs.writeFileSync(join(ldir, mo), result);
  }).catch(e => {
    console.error(e);
    process.exit(2);
  });
};

module.exports = {
  merge
};
