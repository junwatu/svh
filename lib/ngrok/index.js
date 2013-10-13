/**
 * Ngrok wrapper script
 * http://www.ngrok.com
 *
 * it will generate random subdomain if you don't provide subdomain name in -subdomain svh option
 *
 * Created by Equan Pr. on 10/12/13.
 */

var spawn = require('child_process').spawn
    , message = require('../middleware/message')
    , generator = require('../middleware/randname')
    , arg_log = '-log=stdout'
    , argsArray = []
    , ngrok_output
    , ngrok_subdomain;

exports.expose = function (options) {

    argsArray.push(arg_log);
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

var ngrok = function (options, argsArray) {

    argsArray.push(options.port);

    var ngrokproc = spawn(options.ngrokpath, argsArray, {detached: true, stdio: 'ignore'});

    ngrokproc.on('close', function (code) {
        // cleanup
    });
}