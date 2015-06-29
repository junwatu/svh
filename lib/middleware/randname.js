var randomWords = require('random-words')
var async = require('async');

exports.generate = function(callback){
    async.waterfall([
        function(callback){
            randomWords({ exactly: 2, join: '-' });
            callback(null, words);
        }
    ], callback);
}
