var express = require('express'),
    app = express(),
    fs = require('fs'),
    join = require('path').join,
    cheerio = require('cheerio'),
    concat = require('concat-stream'),
    notfound = require('./middleware/404'),
    reloadFlag = 0;


exports.server = function (dirPath, option, callback) {

    app.configure(function () {
        if(option.log === "true"){
            app.use(express.logger());
        }
        app.use(express.compress());
        app.use(app.router);
        app.use(express.static(__dirname+'/client'));
        app.use(express.static(dirPath));
    });

    app.get('/', function (req, res, next) {
        var filename = option.homepage + ".html",
            path = join(dirPath, filename),
            stream = fs.createReadStream(path, {encoding: 'utf-8'});

        stream.pipe(concat(function (data) {
            var $ = cheerio.load(data),

            // hack for a good fuck!
            injectan = "<script src='svh.js'></script>"
            var sel = $('body').append(injectan);

            if(sel.length === 0){
                $('*').after(injectan);
            }

            res.setHeader('Content-Type', 'text/html');
            res.write($.html());
            res.end();
        }))
    });

    app.get('/reload', function(req, res, next){

        var event = "reload";
        client = {
            "reload" : option.reload,
            "reloadFlag": reloadFlag
        };

        res.writeHead(200, {
            "Content-Type":"text/event-stream",
            "Cache-Control":"no-cache",
            "Connection":"keep-alive"
        });

        var id = (new Date()).toLocaleTimeString();

        res.write("id: " + id + '\n');
        res.write("event: " + event + "\n");
        res.write("data: "+JSON.stringify(client)+"\n\n");
        res.write('retry: 500\n');

        // Reset
        reloadFlag = 0;

        res.end();
    });

    app.use(notfound.index);

    var server = app.listen(option.port, callback);
    return server;
};

exports.setReload = function(data){
    reloadFlag = data;
}
