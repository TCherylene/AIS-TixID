var response = require('../res');
var parsetoken = require('../middleware/parseJWT');
const conn = require('../middleware/connection');
var mysql = require('mysql');
const insertPembelian = require('../models/insertPembelian');

function serverErrorResponse(error) {
    throw error;
}

function successResponse(message, res){
    return response.success(message, res)
}

function userErrorResponse(message, res){
    return response.failed(message, res)
}

// ----- POST PEMBELIAN BY ID FILM -----
exports.pembelian = function (req, res){
    var token = req.headers.authorization;
    var dataToken = parsetoken(token);

    var post = {
        id_film: req.body.id_film,
        jumlah_tiket: req.body.jumlah_tiket
    }

    insertPembelian(dataToken.id_user, post.id_film, post.jumlah_tiket);

    // ******************* NANTI INTEGRASI KE SARAH ******************* //

    var query = "SELECT * FROM history AS hs JOIN Pembelian AS pb ON hs.id_pembelian = pb.id_pembelian WHERE id_user = ?"
    var data = [dataToken.id_user]

    conn.query(query, data, function(error, rows){
        if (error) return serverErrorResponse(error);

        return res.status(200).json({
            "status":200,
            "id_history": rows[rows.length].id_history,
            "id_pembelian": rows[rows.length].id_pembelian
        })
    })
}