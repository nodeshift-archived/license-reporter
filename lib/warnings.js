'use strict';

function printWarning (list, type) {
    if (list.length > 0) {
       console.error(`========= WARNING ${type} LICENSES ==========`);
       list.forEach((license) => {
         console.log('name:', license.name,
           ', version:', license.version,
           ', licenses:', license.license);
        });
       console.error(`========= WARNING ${type} LICENSES ==========`);
    }
}

module.exports = {
    printWarning
}