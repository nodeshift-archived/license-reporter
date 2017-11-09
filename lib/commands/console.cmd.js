'use strict';

const { join } = require('path');
const fs = require('fs');
const validator = require('../modules/validator');
const consoleModule = require('../modules/console.mdl');
const unifiedList = require('../modules/unified-list');
const canonicalName = require('../modules/canonical-name');
const checker = require('../modules/checker');
const project = require('../modules/project');

module.exports = () => {
  const cmd = {};
  cmd.command = ['console'];
  cmd.desc = 'Shows license information on standard output.';
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
    'include-license-content': {
      alias: 'ilc',
      describe: 'Includes the license content in the xml.',
      default: false
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

      checker.check(argv.cwd)
      .then((data) => {
        const projectMetaData = consoleModule.transform(data,
          canonicalNameMapper, argv.cwd, argv.ilc);
        console.log(consoleModule.asXML(projectMetaData));
      })
      .catch((e) => {
        console.error(e);
      });
    } else {
      console.log(consoleModule.asXML(project.projectMetaData(argv.cwd)));
    }
  };

  return cmd;
};
