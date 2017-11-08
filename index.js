'use strict';

const { join } = require('path');
const requireDir = require('require-dir');

let commands = requireDir(join(__dirname, 'lib', 'commands'));
commands = Object.keys(commands).map((c) => commands[c]());

module.exports = { commands };
