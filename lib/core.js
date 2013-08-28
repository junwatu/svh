var connect = require('connect');

exports.server = function (dirPath, option, callback) {
    connect()
        .listen(option.port, callback);
}