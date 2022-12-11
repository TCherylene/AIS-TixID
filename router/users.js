'use strict';

var response = require('../res');
var parsetoken = require('../middleware/parseJWT');
// const conn = require('../middleware/connection');
const conn = require('../middleware/connection2');
var mysql = require('mysql');
const insertpembelian = require('../models/insertPembelian');
const integration = require('../integration/dana');
const updatePembelian = require('../models/updatePembelian')

function serverErrorResponse(error) {
    return console.log(error);
}

function successResponse(message, res){
    return response.success(message, res)
}

function userErrorResponse(message, res){
    return response.failed(message, res)
}

// ----- INFORMASI AKUN SENDIRI -----
exports.profil = function(req, res){
    var token = req.headers.authorization;
    var data = parsetoken(token)

    conn.query  ("SELECT * FROM users WHERE id_user = ? AND nomorhp = ?", [data.id_user, data.nomorhp], function(error, rows){
        if(error) serverErrorResponse(error);

        return res.status(200).json({
            "id_user": rows[0].id_user,
            "nama": rows[0].nama,
            "nomorhp": rows[0].nomorhp
        })
    })
}

// ----- INFORMASI FILM -----
exports.film = function(req, res){
    var query = "SELECT * FROM film AS fl JOIN bioskop AS bs ON bs.id_bioskop = fl.id_bioskop"

    conn.query (query, function(error, rows){
        if(error) serverErrorResponse(error);

        var film = [];
        if (rows.length >= 1){
            rows.forEach(element => {
                film.push(element)
            });
        } else if (rows.length == 0){
            film = null;
        }

        return res.status(200).json({
            "status": 200,
            "film": film
        })
    })
}

// ----- INFORMASI FILM BY ID -----
exports.filmById = function (req, res){
    var post = {
        id_film : req.params.id
    }

    var query = "SELECT * FROM film AS fl JOIN bioskop AS bs ON bs.id_bioskop = fl.id_bioskop WHERE id_film = ?"
    var data = [post.id_film]

    conn.query (query, data, function(error, rows){
        if(error) serverErrorResponse(error);

        if(rows.length == 0){
            return userErrorResponse("ID Film tidak ditemukan", res)
        } 

        return res.status(200).json({
            "status": 200,
            "film": rows[0]
        })
    })
}

// ----- POST pembelian BY ID FILM -----
exports.pembelian = function (req, res){
    var token = req.headers.authorization;
    var dataToken = parsetoken(token);

    var post = {
        id_film: req.body.id_film,
        jumlah_tiket: req.body.jumlah_tiket,
        tokenSarah: req.body.tokenSarah
    }

    conn.query("SELECT * FROM film JOIN pembelian ON film.id_film = pembelian.id_film WHERE pembelian.id_film = ?", [post.id_film], async function (error, rows){
        if(error) return serverErrorResponse(error);

        if(rows.length == 0){
            return userErrorResponse("Id film tidak ditemukan", res)
        }

        var hargaTotal = post.jumlah_tiket * rows[0].harga_tiket
        
        insertpembelian(dataToken.id_user, post.id_film, post.jumlah_tiket, hargaTotal);
        // ******************* NANTI INTEGRASI KE DANA ******************* //
        let hasilPembayaran = await integration.pembayaran(dataToken, hargaTotal, post.tokenSarah);

        if(hasilPembayaran.status == 200){
            updatePembelian(1, rows[rows.length - 1].id_pembelian + 1)
            return successResponse("Pembelian berhasil", res)
        } else if (hasilPembayaran.status == 400){
            return userErrorResponse(hasilPembayaran.message, res);
        } else {
            return userErrorResponse("Terjadi kesalahan", res);
        }
    })
}

// ----- GET HISTORY -----
exports.history = function (req, res){
    var token = req.headers.authorization;
    var dataToken = parsetoken(token);

    var query = "SELECT * FROM pembelian AS pb INNER JOIN film AS fi ON pb.id_film = fi.id_film INNER JOIN history AS hs ON hs.id_pembelian = pb.id_pembelian WHERE id_user = ?"
    var data = [dataToken.id_user]

    conn.query(query, data, function(error, rows){
        if (error) serverErrorResponse(error);

        if(rows.length == 0){
            return successResponse("User tidak pernah melakukan pembelian tiket", res)
        }

        var history = [];
        if (rows.length >= 1){
            rows.forEach(element => {
                history.push(element)
            });
        }

        return res.status(200).json({
            "status": 200,
            "history": history
        })
    })
}

// ----- GET HISTORY BY ID -----
exports.historyById = function (req, res){
    var token = req.headers.authorization;
    var dataToken = parsetoken(token);

    var post = {
        id_history: req.params.id
    }

    var query = "SELECT * FROM pembelian AS pb INNER JOIN film AS fi ON pb.id_film = fi.id_film INNER JOIN history AS hs ON hs.id_pembelian = pb.id_pembelian WHERE id_user = ? AND id_history = ?"
    var data = [dataToken.id_user, post.id_history]

    conn.query(query, data, function(error, rows){
        if (error) serverErrorResponse(error);

        if(rows.length == 0){
            return userErrorResponse("ID History tidak ditemukan", res)
        }

        return res.status(200).json({
            "status": 200,
            "history": rows[0]
        })
    })
}