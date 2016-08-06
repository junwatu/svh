'use strict'

exports.index = (req, res, next) => {
    res.send('<pre>Ups! Not found...</pre><pre>We are developers are so persistent! :)</pre>', 404)
    res.end();
}