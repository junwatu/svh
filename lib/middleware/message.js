'use strict';

const chalk = require('chalk');
const pkg = require('../../package.json');

let v = pkg.version;

exports.v = () => { return v; }

exports.version = () => {
    console.log(chalk.blue.bold(`svh ${chalk.red.bold('-')} ${chalk.green.bold("node serve here")} [${v}]`));
}
