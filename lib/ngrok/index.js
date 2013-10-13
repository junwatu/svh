/**
 * Ngrok wrapper script
 * http://www.ngrok.com
 *
 *
 *
 * Created by Equan Pr. on 10/12/13.
 */

var spawn = require('child_process').spawn
    , message = require('../middleware/message')
    , ngrok_path = '/usr/bin/ngrok'
    , arg_log = '-log=stdout'
    , argsArray = []
    , ngrok
    , output_ngrok;

exports.expose = function (options) {
    argsArray.push(arg_log);

    if (options.subdomain !== null) {
        argsArray.push('-subdomain=' + options.subdomain);
        output_ngrok = 'ngrok url at http://' + options.subdomain + '.ngrok.com';
        message.output(output_ngrok);
    }

    if (options.auth !== '') argsArray.push('-httpauth=' + options.auth);

    argsArray.push(options.port);

    ngrok = spawn(ngrok_path, argsArray);

    ngrok.stdout.on('data', function (data) {
        //console.log('ngrok data '+data);
    });

    ngrok.stderr.on('data', function (data) {
        //console.log('ngrok error '+data);
    });

    ngrok.on('close', function (code) {
        // remove .ngrok.yml file here
    });
}

