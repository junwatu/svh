/**
 * Created by equan on 10/13/13.
 */

var chalk = require('chalk')
    , pkg = require('../../package.json')
    , v = pkg.version;

exports.v = function(){
    return v;
}

exports.output = function (msg) {

    console.log(chalk.red.bold("       _______      ___    _"));
    console.log(chalk.red.bold("      / ____\\ \\    / | |  | |"));
    console.log(chalk.green.bold("     | (___  \\ \\  / /| |__| |"));
    console.log(chalk.green.bold("      \\___ \\  \\ \\/ / |  __  |"));
    console.log(chalk.blue.bold("      ____) |  \\  /  | |  | |"));
    console.log(chalk.blue.bold("     |_____/    \\/   |_|  |_|"));
    console.log("");
    console.log(chalk.white.bold("             Node Serve Here"));
    console.log(chalk.white.bold("                     v ") + chalk.white(v));

    if (msg) {
        console.log("");
        console.log(msg);
        console.log("")
    }
};