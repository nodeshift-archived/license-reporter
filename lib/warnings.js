'use strict';

function print (list, type) {
  if (list.length > 0) {
    console.log(`========= WARNING ${type} LICENSES ==========`);
    list.forEach((license) => {
      let msg = `name: ${license.name}, version: ${license.version}, licenses: ${license.license}`;
      if (license.file === 'UNKNOWN') {
        msg += `, file: ${license.file}`;
      }
      console.log(msg);
    });
    console.log(`========= WARNING ${type} LICENSES ==========`);
  }
}

module.exports = {
  print
};
