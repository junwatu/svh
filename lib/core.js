var express = require('express'),
    fs = require('fs'),
    app = express();

exports.server = function (dirPath, option, callback) {
    app.configure(function () {
        app.use(express.logger());
        app.use(express.bodyParser());
        app.use(express.static(dirPath));
    });

    app.get('/', function (req, res) {
        res.sendfile(dirPath + "/"+option.homepage);
    });

    app.listen(option.port, callback);
};