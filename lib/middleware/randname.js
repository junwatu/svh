/**
 * Created by equan on 10/13/13.
 */

var wordgenerator = require('wordgenerator')
    , async = require('async');

exports.generate = function(callback){
    var generator = new wordgenerator();
    async.waterfall([
        function(callback){
            generator.generate({num : 2, separator : '-'}, function(err, words){
                if(err) return callback(err);
                callback(null, words);
            });
        }
    ], callback);
}



