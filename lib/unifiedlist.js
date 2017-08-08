'use script';

const unifiedList = require('./resources/default-unifiedlist.json');

function check (xmlObject) {
  // gets the licenses found in the following format:
  // [{ name: 'roi', version: '0.15.0', license: 'Apache-2.0' }]
  const licensesFound = xmlObject.licenses.license.map((e) => {
    return { name: e.name, version: e.version, license: e.license, approved: 'false' };
  });

  // gets only the approved licenses from the default unified list.
  const approvedList = [];
  Object.keys(unifiedList).forEach(key => {
    if (unifiedList[key].approved === 'yes') {
      approvedList.push(unifiedList[key]);
    }
  });

  // checks the licenses found against properties of approved list
  // to verify if the license name is found.
  const approvedFound = new Set();
  approvedList.forEach((a) => {
    licensesFound.forEach((lf) => {
      if (lf.license === a['fedora_abbrev'] ||
        lf.license === a['fedora_name'] ||
        lf.license === a['spdx_abbrev'] ||
        lf.license === a['spdx_name']) {
        approvedFound.add(lf);
      }
    });
  });

  if (approvedFound.size > 0) {
    console.error(`========= WARNING APPROVED LICENSES ==========`);
    Array.from(new Set(approvedFound)).forEach((license) => {
      console.log('name:', license.name,
           ', version:', license.version,
           ', licenses:', license.license);
    });
    console.error(`========= WARNING APPROVED LICENSES ==========`);
  }
}

module.exports = {
  check
};
