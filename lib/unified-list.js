'use strict';

const reader = require('./file-reader.js');
const validator = require('./json-validator.js');

const approvedSeparator = `========= APPROVED LICENSES        ==========`;
const notApprovedSeparator = `========= NOT APPROVED LICENSES    ==========`;
const clarificationSeparator = `========= CLARIFICATION ADVISED    ==========`;

let unifiedList;

// This function only initializes the unifiedList variable
// to avoid do it again when call urlForName function.
const init = (options) => { unifiedList = reader.readAsJson(options.unifiedList); };

const print = (list, separator) => {
  if (list.size > 0) {
    console.log(separator);
    Array.from(list).forEach((l) => {
      console.log('name:', l.name,
           ', version:', l.version,
           ', licenses:', l.license);
    });
    console.log(separator);
  }
};

const foundInList = (license, listItem) => {
  return (license === listItem['fedora_abbrev'] ||
  license === listItem['fedora_name'] ||
  license === listItem['spdx_abbrev'] ||
  license === listItem['spdx_name']);
};

// checks the licenses found against properties of approved list
// to verify if the license name is found.
function findApproved (approvedList, licensesFound) {
  const approvedFound = new Set();
  approvedList.forEach((a) => {
    licensesFound.forEach((lf) => {
      if (foundInList(lf.license, a)) {
        approvedFound.add(lf);
      }
    });
  });
  return approvedFound;
}

// checks the licenses found against properties of not approved list
// to verify if the license name is found.
function findNotApproved (notApprovedList, licensesFound) {
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
}

function findUnknown (unknownList, licensesFound) {
  const unknownFound = new Set();
  unknownList.forEach((a) => {
    licensesFound.forEach((lf) => {
      if (foundInList(lf.license, a)) {
        unknownFound.add(lf);
      }
    });
  });
  return unknownFound;
}

// gets the licenses found in the following format:
// [{ name: 'roi', version: '0.15.0', license: 'Apache-2.0' }]
function getLicensesFromXmlObject (xmlObject) {
  const licensesFound = xmlObject.dependencies.dependency.map((dep) => {
    const licenseNames = dep.licenses.license.map((license) => {
      return license.name;
    }).join();
    return { name: dep.packageName, version: dep.version, license: licenseNames };
  });
  return licensesFound;
}

function check (options, xmlObject) {
  const licensesFound = getLicensesFromXmlObject(xmlObject);
  validator.validateUnifiedList(options.unifiedList);
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
  print(approvedFound, approvedSeparator);
  print(notApprovedFound, notApprovedSeparator);
  print(unknown, clarificationSeparator);
}

function urlForName (options, name) {
  if (name.indexOf(',') !== -1) {
    return name.split(',').map((name) => {
      return _urlForName(name.trim());
    }).join(', ');
  }
  return _urlForName(name);
}

function _urlForName (name) {
  if (name === 'UNKNOWN') {
    return name;
  }
  if (unifiedList[name]) {
    return unifiedList[name].url;
  }
  console.error(`No URL was found for [${name}]`);
  return 'UNKNOWN';
}

module.exports = {
  check: check,
  urlForName: urlForName,
  init: init
};
