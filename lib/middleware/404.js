/**
 * Created by equan on 10/10/13.
 */

exports.index = function(req, res, next) {
    res.send('<pre>Ups! Not found...</pre><pre>We are developers are so persistent! :)</pre>',404)
    res.end();
}