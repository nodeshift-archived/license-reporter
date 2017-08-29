'use script';

const unifiedList = require('./resources/default-unifiedlist.json');

function check (xmlObject) {
  // gets the licenses found in the following format:
  // [{ name: 'roi', version: '0.15.0', license: 'Apache-2.0' }]
  const licensesFound = xmlObject.licenses.license.map((e) => {
    return { name: e.name, version: e.version, license: e.license, approved: 'false' };
  });

  // gets the approved and not approved licenses from the default unified list.
  const approvedList = [];
  const notApprovedList = [];
  Object.keys(unifiedList).forEach(key => {
    if (unifiedList[key].approved === 'yes') {
      approvedList.push(unifiedList[key]);
    } else {
      notApprovedList.push(unifiedList[key]);
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

  // checks the licenses found against properties of not approved list
  // to verify if the license name is found.
  const notApprovedFound = new Set();
  notApprovedList.forEach((a) => {
    licensesFound.forEach((lf) => {
      if (lf.license === a['fedora_abbrev'] ||
        lf.license === a['fedora_name'] ||
        lf.license === a['spdx_abbrev'] ||
        lf.license === a['spdx_name'] ||
        lf.license.indexOf('*') === lf.license.length - 1) {
        notApprovedFound.add(lf);
      }
    });
  });

  if (approvedFound.size > 0) {
    console.log(`========= APPROVED LICENSES        ==========`);
    Array.from(new Set(approvedFound)).forEach((license) => {
      console.log('name:', license.name,
           ', version:', license.version,
           ', licenses:', license.license);
    });
    console.log(`========= APPROVED LICENSES        ==========`);
  }

  if (notApprovedFound.size > 0) {
    console.log(`========= NOT APPROVED LICENSES    ==========`);
    Array.from(new Set(notApprovedFound)).forEach((license) => {
      console.log('name:', license.name,
           ', version:', license.version,
           ', licenses:', license.license);
    });
    console.log(`========= NOT APPROVED LICENSES    ==========`);
  }
}

module.exports = {
  check
};
