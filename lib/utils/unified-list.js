'use strict';

const fileReader = require('./file-reader');
const messages = require('./messages');

let unifiedList;

const foundInList = (license, listItem) => {
  return (license === listItem['fedora_abbrev'] ||
  license === listItem['fedora_name'] ||
  license === listItem['spdx_abbrev'] ||
  license === listItem['spdx_name']);
};

const checkName = (name) => {
  if (name === 'UNKNOWN') {
    return name;
  }
  if (unifiedList[name]) {
    return unifiedList[name].url;
  }
  console.error(`No URL was found for [${name}]`);
  return 'UNKNOWN';
};

// checks the licenses found against properties of approved list
// to verify if the license name is found.
const findApproved = (approvedList, licensesFound) => {
  const approvedFound = new Set();
  approvedList.forEach((a) => {
    licensesFound.forEach((lf) => {
      if (foundInList(lf.license, a)) {
        approvedFound.add(lf);
      }
    });
  });
  return approvedFound;
};

// checks the licenses found against properties of not approved list
// to verify if the license name is found.
const findNotApproved = (notApprovedList, licensesFound) => {
  const notApprovedFound = new Set();
  notApprovedList.forEach((a) => {
    licensesFound.forEach((lf) => {
      if (foundInList(lf.license, a) ||
        lf.license.indexOf('*') === lf.license.length - 1) {
        notApprovedFound.add(lf);
      }
    });
  });
  return notApprovedFound;
};

const findUnknown = (unknownList, licensesFound) => {
  const unknownFound = new Set();
  unknownList.forEach((a) => {
    licensesFound.forEach((lf) => {
      if (foundInList(lf.license, a)) {
        unknownFound.add(lf);
      }
    });
  });
  return unknownFound;
};

const getLicenses = (projectMetaData) => {
  const licensesFound = projectMetaData.dependencies.dependency.map((dep) => {
    const licenseNames = dep.licenses.license.map((license) => {
      return license.name;
    }).join();
    return { name: dep.packageName, version: dep.version, license: licenseNames };
  });
  return licensesFound;
};

const load = (ul) => {
  unifiedList = fileReader.readAsJson(ul);
};

const urlForName = (name) => {
  if (name.indexOf(',') !== -1) {
    return name.split(',').map((name) => {
      return checkName(name.trim());
    }).join(', ');
  }
  return checkName(name);
};

const check = (projectMetaData) => {
  const licensesFound = getLicenses(projectMetaData);
  // gets the approved, not approved and unknown licenses
  // from the default unified list file.
  const approvedList = [];
  const notApprovedList = [];
  const unknownList = [];
  Object.keys(unifiedList).forEach(key => {
    if (unifiedList[key].approved === 'yes') {
      approvedList.push(unifiedList[key]);
    } else if (unifiedList[key].approved === 'no') {
      notApprovedList.push(unifiedList[key]);
    } else {
      unknownList.push(unifiedList[key]);
    }
  });

  const approvedFound = findApproved(approvedList, licensesFound);
  const notApprovedFound = findNotApproved(notApprovedList, licensesFound);
  const unknown = findUnknown(unknownList, licensesFound);
  messages.print(approvedFound, '========= APPROVED LICENSES        ==========');
  messages.print(notApprovedFound, '========= NOT APPROVED LICENSES    ==========');
  messages.print(unknown, '========= CLARIFICATION ADVISED    ==========');
};

module.exports = {
  load,
  urlForName,
  check
};
