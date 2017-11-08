'use strict';

const { join } = require('path');
const fs = require('fs');
const validator = require('../modules/validator');
const reportModule = require('../modules/report.mdl');
const unifiedList = require('../modules/unified-list');
const canonicalName = require('../modules/canonical-name');
const checker = require('../modules/checker');

const ldir = join(process.cwd(), 'licenses');
const createLicenseDir = () => {
  if (!fs.existsSync(ldir)) {
    fs.mkdirSync(ldir);
  }
};

module.exports = () => {
  const cmd = {};
  cmd.command = ['report'];
  cmd.desc = 'Creates a HTML report.';
  cmd.builder = {
    'name-map': {
      alias: 'nm',
      describe: 'Pass the name map file.',
      default: join(__dirname, '../modules/resources/default-canonical-names.json'),
      nargs: 1
    },
    'unified-list': {
      alias: 'ul',
      describe: 'Pass the unified (approved/not-approved) license list.',
      default: join(__dirname, '../modules/resources/default-unified-list.json'),
      nargs: 1
    },
    css: {
      describe: 'CSS file to apply style on html report.',
      default: join(__dirname, '../modules/resources/licenses.css'),
      nargs: 1
    }
  };

  cmd.handler = (argv) => {
    if (!validator.projectHasPackageJson(argv.cwd)) {
      console.error('This is not a Node.js project (no package.json found).');
      process.exit(1);
    }

    if (validator.projectHasNodeModules(argv.cwd)) {
      let canonicalNameMapper;
      if (fs.existsSync(argv.nm)) {
        const mappings = canonicalName.loadNameMapperFile(argv.nm);
        canonicalNameMapper = canonicalName.init(mappings);
      } else {
        console.error(`File not found: ${argv.nm}`);
        process.exit(1);
      }

      if (fs.existsSync(argv.ul)) {
        unifiedList.load(argv.ul);
      } else {
        console.error(`File not found: ${argv.ul}`);
        process.exit(1);
      }

      createLicenseDir();

      checker.check(argv.cwd)
      .then((data) => {
        const projectMetaData = reportModule.transform(data,
          canonicalNameMapper, argv.cwd, argv.ilc);
        reportModule.report(projectMetaData, argv.css);
      })
      .catch((e) => {
        console.error(e);
      });
    }
  };

  return cmd;
};
