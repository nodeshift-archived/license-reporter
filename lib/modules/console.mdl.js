'use strict';

const js2xmlparser = require('js2xmlparser');

const unifiedList = require('../utils/unified-list');
const dual = require('../utils/dual');
const project = require('../utils/project');
const versionHandler = require('../utils/version-handler');
const messages = require('../utils/messages');
const fileReader = require('../utils/file-reader');

const licenseNameUrl = (canonicalNameMapper, license) => {
  const canonicalName = canonicalNameMapper.map(license);
  const url = unifiedList.urlForName(canonicalName);
  return { name: canonicalName, url: url };
};

const urlValue = (nameUrl, ilc, file) => {
  if (file && file.includes(nameUrl.name.split(' ')[0].toUpperCase())) {
    return ilc ? fileReader.readLicenseFile(file) : nameUrl.url;
  }
  return nameUrl.url;
};

const licenseMetaData = (licenses, canonicalNameMapper, ilc, file) => {
  const licenseData = { license: [] };
  if (dual.isDual(licenses)) {
    let nameUrl = licenseNameUrl(canonicalNameMapper, dual.first(licenses));
    licenseData.license.push({name: nameUrl.name, url: urlValue(nameUrl, ilc, file)});

    nameUrl = licenseNameUrl(canonicalNameMapper, dual.last(licenses));
    licenseData.license.push({name: nameUrl.name, url: urlValue(nameUrl, ilc, file)});
  } else {
    const nameUrl = licenseNameUrl(canonicalNameMapper, licenses);
    licenseData.license.push({name: nameUrl.name, url: urlValue(nameUrl, ilc, file)});
  }
  return licenseData;
};

const packageMetaData = (data) => {
  const packageArray = [];
  data.forEach((d) => {
    const nv = versionHandler.fromNpmVersion(d.dependency);
    const pkg = {packageName: nv.name,
      version: nv.version,
      licenses: d.licenses,
      file: d.file};
    packageArray.push(pkg);
  });
  return packageArray;
};

const declaredDependencies = (data, dependencies) => {
  const array = [];
  for (const d in dependencies) {
    array.push(versionHandler.asNpmVersion(d, dependencies[d]));
  }
  array.join(',');
  const filtered = [];
  array.forEach((d) => {
    const declared = data.filter((e) => e.dependency === d)[0];
    if (declared) {
      filtered.push(declared);
    }
  });
  return filtered;
};

const transform = (data, canonicalNameMapper, cwd, ilc, fdt, s) => {
  const projectMetaData = project.projectMetaData(cwd);
  if (!fdt) {
    data = declaredDependencies(data, project.dependencies(cwd));
  }
  data = packageMetaData(data);

  data.forEach((d) => {
    d.licenses = licenseMetaData(d.licenses, canonicalNameMapper, ilc, d.file);
    delete d.file;
  });

  projectMetaData.dependencies.dependency = data;
  if (!s) {
    messages.show(project.dependencies(cwd), projectMetaData);
  }
  return projectMetaData;
};

const asXML = (projectMetaData) => {
  return js2xmlparser.parse('licenseSummary', projectMetaData);
};

module.exports = {
  transform,
  asXML,
  declaredDependencies,
  packageMetaData,
  licenseMetaData,
  licenseNameUrl
};
