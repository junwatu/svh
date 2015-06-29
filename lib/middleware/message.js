/**
 * Created by equan on 10/13/13.
 */

var chalk = require('chalk');
var pkg = require('../../package.json');
var v = pkg.version;

exports.v = function(){
    return v;
}

exports.head = function(){
    console.log(chalk.red.bold("       _______      ___    _"));
    console.log(chalk.red.bold("      / ____\\ \\    / | |  | |"));
    console.log(chalk.green.bold("     | (___  \\ \\  / /| |__| |"));
    console.log(chalk.green.bold("      \\___ \\  \\ \\/ / |  __  |"));
    console.log(chalk.blue.bold("      ____) |  \\  /  | |  | |"));
    console.log(chalk.blue.bold("     |_____/    \\/   |_|  |_|"));
    console.log("");
    console.log(chalk.white.bold("             node serve here"));
    console.log(chalk.white.bold("                     v ") + chalk.white(v));
}

exports.version = function() {
    console.log(chalk.blue.bold("svh v"+v+ chalk.red.bold(' - ')+chalk.green.bold("node serve here")));
}
