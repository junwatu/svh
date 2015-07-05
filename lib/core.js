var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var fs = require('fs');
var join = require('path').join;
var cheerio = require('cheerio');
var concat = require('concat-stream');
var notfound = require('./middleware/404');
var reloadFlag = false;

exports.server = function (dirPath, options, callback) {
    app.configure(function () {
        if(options.log === "true"){
            app.use(express.logger());
        }

        app.use(express.bodyParser());
        app.use(express.compress());
        app.use(app.router);
        app.use(express.static(__dirname+'/client'));
        app.use(express.static(dirPath));
    });

    app.use(favicon(__dirname + '/client/favicon.ico'));

    app.get('/', function (req, res, next) {
        var filename = options.homepage + ".html",
            path = join(dirPath, filename),
            stream = fs.createReadStream(path, {encoding: 'utf-8'});

        stream.pipe(concat(function (data) {
            var $ = cheerio.load(data),

            injectan = "<script src='humane.min.js'></script><script src='svh.min.js'></script>"
            var sel = $('body').append(injectan);
            var css = $('head').append("<link rel='stylesheet' href='themes/libnotify.css'/>");
            
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
            "reload" : getReload(),
            "hostname": options.hostname,
            "port": options.port
        };

        res.writeHead(200, {
            "Content-Type":"text/event-stream",
            "Cache-Control":"no-cache",
            "Connection":"keep-alive"
        });

        var id = (new Date()).toLocaleTimeString();
        var dataSSE = {
            id: id,
            event: event,
            client: client
        }
        createSSE(req, res, dataSSE);
    });

    app.post('/reload', function(req, res){
        if(!req.body.reload){
          reloadFlag = false;

        }
        res.json({status: true});
    });

    app.use(notfound.index);

    var server = app.listen(options.port, callback);
    return server;
};

function createSSE(req, res, data){
    res.write("id: " + data.id + '\n');
    res.write("event: " + data.event + "\n");
    res.write("data: "+JSON.stringify(data.client)+"\n\n");
    res.end();
}

exports.setReload = function(data){
    reloadFlag = data;
}

var getReload = function() {
    return reloadFlag;
}
