'use strict';

function print (list, type) {
  if (list.length > 0) {
    console.log(`========= WARNING ${type} LICENSES ==========`);
    list.forEach((license) => {
      console.log('name:', license.name,
           ', version:', license.version,
           ', licenses:', license.license);
    });
    console.log(`========= WARNING ${type} LICENSES ==========`);
  }
}

module.exports = {
  print
};
