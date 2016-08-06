'use strict';

const randomWords = require('random-words')
const async = require('async');

exports.generate = (callback) => {
    async.waterfall([
        (callback) => {
            let words = randomWords({ exactly: 2, join: '-' });
            callback(null, words);
        }
    ], callback);
}
