/**
 * Ngrok wrapper script
 * ---------------------
 * Ngrok is awesome product from http://www.ngrok.com
 *
 *
 * if you don't provide subdomain name in -subdomain svh option
 * it will generate random subdomain name
 *
 *
 *
 * sample commands
 *
 * using ngrok in default path /usr/bin/ngrok with random subdomain and basic auth.
 *
 * $ svh serve -n yes -a shoot:angel project_dir
 *
 *
 * using ngrok in default path /usr/bin/ngrok with subdomain name 'shoot-angel' and basic auth.
 *
 * $ svh serve -n yes -a shoot:angel -s shoot-angel project_dir
 *
 *
 * using ngrok in path /home/angel/bin/ngrok with random subdomain and auth.
 *
 * $ svh serve -n yes -N /home/angel/bin/ngrok -a shoot:angel project_dir
 *
 *
 *
 * Created by Equan Pr. on 10/12/13.
 */

var spawn = require('child_process').spawn
    , message = require('../middleware/message')
    , generator = require('../middleware/randname')
    , fs = require('fs')
    , argsArray = []
    , ngrok_output
    , ngrok_subdomain;

exports.expose = function (options) {
    if (fs.exists(options.ngrokpath, function (exist) {
        exist ? initngrok(options) : message.output('ngrok not found...\n please download from https://ngrok.com/download');
    }));
};

var initngrok = function (options) {

        if (options.auth !== '') argsArray.push('-httpauth=' + options.auth);

        if (options.subdomain !== null) {
            argsArray.push('-subdomain=' + options.subdomain);
            ngrok_output = 'ngrok url at http://' + options.subdomain + '.ngrok.com';
            message.output(ngrok_output);
            ngrok(options, argsArray);
        } else {
            // take random name so ngrok will always use words
            generator.generate(function (err, words) {
                ngrok_subdomain = words;
                ngrok_output = 'ngrok url at http://' + ngrok_subdomain + '.ngrok.com';
                message.output(ngrok_output);
                argsArray.push('-subdomain=' + ngrok_subdomain);
                ngrok(options, argsArray);
            });
        }
    }
    , ngrok = function (options, argsArray) {

        argsArray.push(options.port);

        var ngrokproc = spawn(options.ngrokpath, argsArray, {detached: true, stdio: 'ignore'});

        ngrokproc.on('close', function (code) {
            // cleanup
        });
    }