'use strict';

const { join } = require('path');
const fs = require('fs');
const validator = require('../modules/validator');
const consoleModule = require('../modules/console.mdl');
const saveModule = require('../modules/save.mdl');
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
  cmd.command = ['save'];
  cmd.desc = 'Saves license information to a file.';
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
    'full-dependency-tree': {
      alias: 'fdt',
      describe: 'Will list all production licenses for all modules.',
      default: false
    },
    xml: {
      describe: 'Saves as XML.',
      type: 'string',
      nargs: 1
    },
    json: {
      describe: 'Saves as JSON.',
      type: 'string',
      nargs: 1
    },
    yaml: {
      describe: 'Saves as YAML.',
      type: 'string',
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
        validator.validate(argv.ul);
        unifiedList.load(argv.ul);
      } else {
        console.error(`File not found: ${argv.ul}`);
        process.exit(1);
      }

      createLicenseDir();

      checker.check(argv.cwd)
      .then((data) => {
        const projectMetaData = consoleModule.transform(data,
          canonicalNameMapper, argv.cwd, argv.ilc, argv.fdt);
        saveModule.save(projectMetaData, argv);
      })
      .catch((e) => {
        console.error(e);
      });
    }
  };

  return cmd;
};
