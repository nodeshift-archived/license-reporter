'use strict';

const fs = require('fs');
const { basename, join, resolve } = require('path');
const consoleModule = require('./console.mdl');

const project = require('../utils/project');
const html = require('../utils/html');
const messages = require('../utils/messages');
const dual = require('../utils/dual');

const ldir = join(process.cwd(), 'licenses');

const reportFileName = (name, type) => {
  let rfn = `${name}_${type}.txt`;
  rfn = rfn.replace(/@/gi, '');
  rfn = rfn.replace(/\//gi, '-');
  return rfn;
};

const reportFileData = (projectMetaData) => {
  projectMetaData.dependencies.dependency.forEach(d => {
    const nameUpperCase = typeof d.licenses.license[0].name === 'string'
      ? d.licenses.license[0].name.split(' ')[0].toUpperCase()
      : d.licenses.license[0].name[0];

    if (d.file && d.file.includes(nameUpperCase)) {
      const link = join('./', d.file);
      d.localLicense = require('querystring').escape(link).replace(/%2F/gi, '/');
      d.linkLabel = link;
    } else {
      d.localLicense = '#';
      d.linkLabel = 'No local license could be found for the dependency';
    }
  });
  return projectMetaData;
};

const htmlReport = (reportData) => {
  html.parse(reportData).then(output => {
    fs.writeFileSync(join(ldir, 'licenses.html'), output);
  });
};

const copyCSS = (css) => {
  if (fs.existsSync(css)) {
    fs.createReadStream(resolve(css))
      .pipe(fs.createWriteStream(join(ldir, 'licenses.css')));
  } else {
    console.error(`CSS file not found: ${css}`);
  }
};

const copyLicenseFile = (name, type, file) => {
  let fileName;
  if (basename(file).toUpperCase() !== 'README.MD') {
    fileName = reportFileName(name, type).toUpperCase();
    fs.createReadStream(file)
      .pipe(fs.createWriteStream(join(ldir, fileName)));
  }
  return fileName;
};

const licenseMetaData = (licenses, canonicalNameMapper, ilc, file) => {
  const licenseData = { license: [] };
  if (dual.isDual(licenses)) {
    let nameUrl = consoleModule.licenseNameUrl(canonicalNameMapper, dual.first(licenses));
    licenseData.license.push({name: dual.first(licenses), url: nameUrl.url});

    nameUrl = consoleModule.licenseNameUrl(canonicalNameMapper, dual.last(licenses));
    licenseData.license.push({name: dual.last(licenses), url: nameUrl.url});
  } else {
    const nameUrl = consoleModule.licenseNameUrl(canonicalNameMapper, licenses);
    licenseData.license.push({name: licenses, url: nameUrl.url});
  }
  return licenseData;
};

const transform = (data, canonicalNameMapper, cwd, ilc, fdt, s) => {
  const projectMetaData = project.projectMetaData(cwd);
  if (!fdt) {
    data = consoleModule.declaredDependencies(data, project.dependencies(cwd));
  }
  data = consoleModule.packageMetaData(data);
  data.forEach((d) => {
    if (d.file) {
      d.file = copyLicenseFile(d.packageName, d.licenses, d.file);
    } else {
      console.log(`No license file found for ${d.packageName}`);
    }
    d.licenses = licenseMetaData(d.licenses, canonicalNameMapper, ilc, d.file);
  });
  data.forEach((d) => {
    if (d.licenses.license.length === 2) {
      const clone = JSON.parse(JSON.stringify(d));
      d.licenses.license.pop();
      clone.licenses.license.shift();
      data.push(clone);
    }
  });
  data.sort((a, b) => a.packageName.localeCompare(b.packageName));
  projectMetaData.dependencies.dependency = data;
  if (!s) {
    messages.show(project.dependencies(cwd), projectMetaData);
  }
  return projectMetaData;
};

const report = (projectMetaData, css) => {
  copyCSS(css);
  htmlReport(reportFileData(projectMetaData));
};

module.exports = {
  report,
  transform
};
