'use strict';

const BinWrapper = require('bin-wrapper');
const path = require('path');

//7 Aug 2016
const BASE = "https://bin.equinox.io/c/4VmDzA7iaHb";
const VERSION = "2.1.3";

module.exports = new BinWrapper()
    .src(`${BASE}/ngrok-stable-darwin-amd64.zip`, 'darwin', 'x64')
    .src(`${BASE}/ngrok-stable-linux-amd64.zip`, 'linux', 'x64')
    .src(`${BASE}/ngrok-stable-linux-386.zip`, 'linux', 'ia32')
    .src(`${BASE}/ngrok-stable-windows-amd64.zip`, 'win32', 'x64')
    .src(`${BASE}/ngrok-stable-windows-386.zip`, 'win32', 'ia32')
    .dest(path.join(__dirname, '../../vendor'))
    .use(process.platform == 'win32' ? 'ngrok.exe' : 'ngrok')
