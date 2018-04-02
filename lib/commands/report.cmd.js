'use strict';

const { join } = require('path');
const fs = require('fs');
const npv = require('node-project-validator');

const reportModule = require('../modules/report.mdl');

const validator = require('../utils/validator');
const unifiedList = require('../utils/unified-list');
const canonicalName = require('../utils/canonical-name');
const checker = require('../utils/checker');
const licenseDir = require('../utils/license-dir');

exports.command = 'report';
exports.desc = 'Creates a HTML report.';
exports.builder = {
  'name-map': {
    alias: 'nm',
    describe: 'Pass the name map file.',
    default: join(__dirname, '../utils/resources/default-canonical-names.json'),
    nargs: 1
  },
  'unified-list': {
    alias: 'ul',
    describe: 'Pass the unified (approved/not-approved) license list.',
    default: join(__dirname, '../utils/resources/default-unified-list.json'),
    nargs: 1
  },
  css: {
    describe: 'CSS file to apply style on html report.',
    default: join(__dirname, '../utils/resources/licenses.css'),
    nargs: 1
  },
  'full-dependency-tree': {
    alias: 'fdt',
    describe: 'Will list all production licenses for all modules.',
    default: false
  },
  'include-dev-dependencies': {
    alias: 'idd',
    describe: 'Will include devDependencies in HTML report',
    default: false
  },
  'silent': {
    alias: 's',
    describe: 'Hides warning messages.',
    default: false
  }
};

exports.handler = (argv) => {
  npv.hasPackageJson(argv.cwd, true);
  npv.hasDependencies(argv.cwd, true);

  if (npv.hasNodeModules(argv.cwd, false)) {
    let canonicalNameMapper;
    if (fs.existsSync(argv.nm)) {
      const mappings = canonicalName.loadNameMapperFile(argv.nm);
      canonicalNameMapper = canonicalName.init(mappings);
    } else {
      console.error(`File not found: ${argv.nm}`);
      process.exit(1);
    }

    if (fs.existsSync(argv.ul)) {
      validator.validate(argv.ul);
      unifiedList.load(argv.ul);
    } else {
      console.error(`File not found: ${argv.ul}`);
      process.exit(1);
    }

    licenseDir.removeLicenses(licenseDir.create());

    checker.check(argv.cwd, !argv.idd)
      .then((data) => {
        const projectMetaData = reportModule.transform(data,
          canonicalNameMapper, argv.cwd, argv.ilc, argv.fdt, argv.s);
        reportModule.report(projectMetaData, argv.css);
      })
      .catch((e) => {
        console.error(e);
      });
  }
};
