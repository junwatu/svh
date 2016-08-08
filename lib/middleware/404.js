'use strict'

exports.index = (req, res, next) => {
    res.send('<pre>Sorry page not found...</pre>', 404);
    res.end();
}
