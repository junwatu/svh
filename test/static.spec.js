'use strict';

var app = require('../lib/core');
var request = require('supertest');
var fspath = require('path');
var options = {
    port: 3003,
    homepage: 'index',
    isWatching: true,
    reload: 'no',
    log: false
};

var path = fspath.join(__dirname, '../examples');

describe('Test SVH Server', function () {

    var svh = app.server(path, options, function () {
        console.log('running test server');
    });

    // test commonly used files (html, js, css)
    describe('test html homepage', function () {
        it('should respon with html file type', function (done) {
            request(svh)
                .get('/')
                .expect('Content-Type', /html/)
                .end(function (err, res) {
                    if (err) return done(err)
                    done();
                })
        })
    });

    describe('test js', function () {
        it('should respon with js file type', function (done) {
            request(svh)
                .get('/js/app.js')
                .expect('Content-Type', /javascript/)
                .end(function (err, res) {
                    if (err) return done(err)
                    done();
                })
        })
    });

    describe('test stylesheet', function () {
        it('should respon with css file type', function (done) {
            request(svh)
                .get('/css/app.css')
                .expect('Content-Type', /css/)
                .end(function (err, res) {
                    if (err) return done(err)
                    done();
                })
        })
    })

    describe('test reload', function () {
        it('should respon with event-stream type', function (done) {
            request(svh)
                .get('/reload')
                .expect('Content-Type', /event-stream/)
                .end(function (err, res) {
                    if (err) return done(err)
                    done();
                })
        })
    })
});
