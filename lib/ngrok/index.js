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
 * http://equan.me
 */

var spawn = require('child_process').spawn;
var message = require('../middleware/message');
var generator = require('../middleware/randname');
var fs = require('fs');
var request = require('request');

var argsArray = [];
var ngrok_output;
var ngrok_subdomain;

exports.expose = function (options) {
    if (fs.exists(options.ngrokpath, function (exist) {
        exist ? initngrok(options) : console.log('ngrok not found...\n please download from https://ngrok.com/download');
    }));
};

var initngrok = function (options) {
        argsArray.push('http');
        if (options.auth !== '') argsArray.push('-httpauth=' + options.auth);
        if (options.subdomain !== null) {
            argsArray.push('-subdomain=' + options.subdomain);
            ngrok_output = 'public site at http://' + options.subdomain + '.ngrok.com';
            console.log(ngrok_output);
            argsArray.push(options.port);
            ngrok(options, argsArray);
        } else if(options.subdomain === 'random'){
            generator.generate(function (err, words) {
                ngrok_subdomain = words;
                ngrok_output = 'ngrok url at http://' + ngrok_subdomain + '.ngrok.com';
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

var ngrok = function (options, argsArray) {
    spawn(options.ngrokpath, argsArray,  { detached: true, stdio: 'ignore'});
    request('http://127.0.0.1:4040/api/tunnels/command_line', function(err,response, body){
        err ? console.log(err): console.log('public site at '+JSON.parse(body).public_url);
    })
}
