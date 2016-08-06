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
 * using ngrok in default path /usr/bin/ngrok with basic auth.
 *
 * $ svh serve -n -a shoot:angel  project_dir
 *
 * 
 * * **Custom domain only available for paid plan user**
 * 
 * using ngrok with custom domain
 * 
 * $ svh serve -n -a shoot:angel -s situstop project_dir
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

let initngrok = (options) => {
    argsArray.push('http');

    if (options.auth !== '') argsArray.push(`-auth=${options.auth}`);

    // Random subdomain only for paid plan user
    if (options.subdomain !== null) {
        argsArray.push(`-subdomain=${options.subdomain}`);
        ngrok_output = `public site at https://${options.subdomain}.ngrok.io`;
        console.log(ngrok_output);
        argsArray.push(options.port);
        ngrok(options, argsArray);
    } else if (options.subdomain === 'random') {
        generator.generate((err, words) => {
            ngrok_subdomain = words;
            ngrok_output = `ngrok url at https://${ngrok_subdomain}.ngrok.io`;
            console.log(ngrok_output);
            argsArray.push(`-subdomain=${ngrok_subdomain}`);
            argsArray.push(options.port);
            ngrok(options, argsArray);
        });
    } else {
        argsArray.push(options.port);
        ngrok(options, argsArray);
    }
}

let ngrok = (options, argsArray) => {
    let _ngrok = spawn(options.ngrokpath, argsArray, { detached: true, stdio: ['ignore'] });

    _ngrok.stderr.on('data', (data) => {
        console.log(data.toString());
    })

    _ngrok.stdout.on('data', (data) => {
        console.log(data.toString());
    })

    setTimeout(() => infoCheck(), 5000);

    process.on('SIGINT', () => {
        if (_ngrok.pid) {
            console.log('\nKill ngrok...');
            _ngrok.kill();
            console.log('Thanks!');
        }
        process.exit(1);
    })

    _ngrok.unref();
}

let infoCheck = () => {
    request('http://127.0.0.1:4040/api/tunnels/command_line', (err, response, body) => {
        if (err) {
            console.log(err);
        } else {
            let ngrok_data = JSON.parse(body);
            let public_site = ngrok_data.public_url;

            if (ngrok_data.error_code) console.log(`error ${ngrok_data.msg}`);
            if (public_site) console.log(`public site at ${public_site}`);
        }
    })
}

exports.expose = (options) => {
    if (fs.exists(options.ngrokpath, (exist) => {
        exist ? initngrok(options) : console.log('ngrok not found, please download from https://ngrok.com/download');
    }));
};
