'use strict';

const { join } = require('path');
const consoleModule = require('./lib/modules/console.mdl');
const canonicalName = require('./lib/utils/canonical-name');
const unifiedList = require('./lib/utils/unified-list');
const checker = require('./lib/utils/checker');

/**
 * Searches licenses of project's dependencies and send to stdout.
 * @param {string} dir project root directory.
 * @param {boolean} idd Include devDependencies.
 */
const licenses = (dir, idd) => {
  const mappings = canonicalName.loadNameMapperFile(join(__dirname, 'lib/utils/resources/default-canonical-names.json'));
  const canonicalNameMapper = canonicalName.init(mappings);
  unifiedList.load(join(__dirname, 'lib/utils/resources/default-unified-list.json'));

  checker.check(dir, idd)
    .then((data) => {
      const projectMetaData = consoleModule.transform(data, canonicalNameMapper, dir, false, false, true);
      projectMetaData.dependencies.dependency.forEach((d) => {
        console.log(`${d.packageName} -> ${d.licenses.license[0].name}`);
      });
    })
    .catch((e) => {
      console.error(e);
    });
};

module.exports = {
  licenses
};
