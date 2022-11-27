'use strict';

var response = require('./res');

exports.index = function (req, res) {
    response.success("Halo! Silahkan gunakan /api untuk mengakses", res)
};