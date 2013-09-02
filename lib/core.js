var express = require('express'),
    app = express();

exports.server = function (dirPath, option, callback) {

    app.configure(function () {
        app.use(express.logger());
        app.use(express.compress());
        app.use(app.router);
        app.use(express.static(dirPath));
    });

    app.get('/', function (req, res) {
        res.sendfile(option.homepage+".html", {root:dirPath});
    });

    var server = app.listen(option.port, callback);

    return server;
};
