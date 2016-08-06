'use strict';

const express = require('express');
const app = express();
const favicon = require('serve-favicon');
const fs = require('fs');
const join = require('path').join;
const cheerio = require('cheerio');
const concat = require('concat-stream');
const notfound = require('./middleware/404');

let reloadFlag = false;

exports.server = (dirPath, options, callback) => {
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

        let event = "reload";
        let client = {
            "reload" : getReload(),
            "hostname": options.hostname,
            "port": options.port
        };

        res.writeHead(200, {
            "Content-Type":"text/event-stream",
            "Cache-Control":"no-cache",
            "Connection":"keep-alive"
        });

        let id = (new Date()).toLocaleTimeString();
        let dataSSE = {
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

    let server = app.listen(options.port, callback);
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

let getReload = function() {
    return reloadFlag;
}
