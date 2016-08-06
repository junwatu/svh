/**
 * Ngrok wrapper script
 * ---------------------
 * Ngrok is awesome product from http://www.ngrok.com
 *
 *
 * if you don't provide subdomain name in -subdomain svh option
 * it will generate random subdomain name
 *
 * sample commands
 *
 * using ngrok in default path /usr/bin/ngrok with random subdomain and basic auth.
 *
 * $ svh serve --ngrok project_dir
 *
 *
 *
 * **Custom domain only availabel in paid user**
 *
 * using ngrok in default path /usr/bin/ngrok with subdomain name 'shoot-angel' and basic auth.
 *
 * $ svh serve -n -a shoot:angel -s shoot-angel project_dir
 *
 *
 * using ngrok in path /home/angel/bin/ngrok with random subdomain and auth.
 *
 * $ svh serve -n -N /home/angel/bin/ngrok -a shoot:angel project_dir
 *
 *
 *
 * Author by Equan Pr.
 * http://junwatu.github.io
 */

const spawn = require('child_process').spawn;
const message = require('../middleware/message');
const generator = require('../middleware/randname');
const fs = require('fs');
const request = require('request');

let argsArray = [];
let ngrok_output;
let ngrok_subdomain;

exports.expose = function (options) {
    if (fs.exists(options.ngrokpath, function (exist) {
        exist ? initngrok(options) : console.log('ngrok not found...\n please download from https://ngrok.io/download');
    }));
};

var initngrok = function (options) {
    argsArray.push('http');
    if (options.auth !== '') argsArray.push(`-auth "${options.auth}"`);
    if (options.subdomain !== null) {
        argsArray.push('-subdomain=' + options.subdomain);
        ngrok_output = 'public site at https://' + options.subdomain + '.ngrok.io';
        console.log(ngrok_output);
        argsArray.push(options.port);
        ngrok(options, argsArray);
    } else if (options.subdomain === 'random') {
        generator.generate(function (err, words) {
            ngrok_subdomain = words;
            ngrok_output = 'ngrok url at https://' + ngrok_subdomain + '.ngrok.io';
            console.log(ngrok_output);
            argsArray.push('-subdomain=' + ngrok_subdomain);
            argsArray.push(options.port);
            ngrok(options, argsArray);
        });
    } else {
        argsArray.push(options.port);
        ngrok(options, argsArray);
    }
}

var ngrok = (options, argsArray) => {
    let _ngrok = spawn(options.ngrokpath, argsArray, { detached: true, stdio: 'ignore' });
    request('http://127.0.0.1:4040/api/tunnels/command_line', function (err, response, body) {
        if (err) {
            console.log(err);
        } else {
            let public_site = JSON.parse(body).public_url;
            if (public_site) {
                console.log('public site at ' + public_site);
            }
        }
    })

    process.on('SIGINT', () => {
        _ngrok.kill();
        process.exit(1);
    })
}
