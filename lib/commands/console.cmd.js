'use strict';

const { join } = require('path');
const fs = require('fs');
const npv = require('node-project-validator');

const consoleModule = require('../modules/console.mdl');

const validator = require('../utils/validator');
const unifiedList = require('../utils/unified-list');
const canonicalName = require('../utils/canonical-name');
const checker = require('../utils/checker');
const project = require('../utils/project');

exports.command = 'console';
exports.desc = 'Shows license information on standard output.';
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
  'include-license-content': {
    alias: 'ilc',
    describe: 'Includes the license content in the xml.',
    default: false
  },
  'full-dependency-tree': {
    alias: 'fdt',
    describe: 'Will list all production licenses for all modules.',
    default: false
  },
  'include-dev-dependencies': {
    alias: 'idd',
    describe: 'Will include devDependencies in output',
    default: false
  },
  silent: {
    alias: 's',
    describe: 'Hides warning messages.',
    default: false
  }
};

exports.handler = async (argv) => {
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

    try {
      const data = await checker.check(argv.cwd, !argv.idd);

      const projectMetaData = consoleModule.transform(
        data,
        canonicalNameMapper,
        argv.cwd,
        argv.ilc,
        argv.fdt,
        argv.s
      );
      console.log(consoleModule.asXML(projectMetaData));
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log(consoleModule.asXML(project.projectMetaData(argv.cwd)));
  }
};
