'use strict';

var response = require('../res');
var parsetoken = require('../middleware/parseJWT');
const conn = require('../middleware/connection');
// const conn = require('../middleware/connection2');
var mysql = require('mysql');

function serverErrorResponse(error) {
    throw error;
}

function successResponse(message, res){
    return response.success(message, res)
}

function userErrorResponse(message, res){
    return response.failed(message, res)
}

// ----- INFORMASI AKUN SENDIRI -----
exports.film = function(req, res){
    var post = {
        judul_film: req.body.judul,
        tanggal_film: req.body.tanggal,
        waktu_film: req.body.waktu,
        id_bioskop: req.body.id_bioskop,
        harga_tiket: req.body.harga_tiket
    }

    var query = "INSERT INTO film (judul_film, tanggal_film, waktu_film, id_bioskop, harga_tiket) VALUES(?, ?, ?, ?, ?);"
    var data = [post.judul_film, post.tanggal_film, post.waktu_film, post.id_bioskop, post.harga_tiket]

    if (post.judul_film, post.tanggal_film == null || post.waktu_film == null || post.id_bioskop == null || post.harga_tiket == null){
        return userErrorResponse("Masukkan judul, tanggal, waktu, id_bioskop, harga_tiket");
    }

    conn.query("SELECT id_bioskop FROM bioskop WHERE id_bioskop = ?", [post.id_bioskop], function (error, rows){
        if (error) return serverErrorResponse(error);

        if(rows.length == 0){
            return userErrorResponse("Tambahkan bioskop terlebih dahulu dengan POST /api/bioskop", res);
        } 

        conn.query(query, data, function(error, rows){
            if (error) return serverErrorResponse(error);
            return successResponse("Film baru telah dimasukkan", res);
        })
    })
}

exports.bioskop = function (req, res){
    var post = {
       nama_bioskop: req.body.nama
    }

    if(post.nama_bioskop == null){
        return userErrorResponse("Masukkan nama bioskop", res)
    }

    var query = "INSERT INTO bioskop(nama_bioskop) VALUES (?)"
    var data = [post.nama_bioskop];

    conn.query("SELECT * FROM bioskop WHERE nama_bioskop = ?", [post.nama_bioskop], function(error, rows){
        if(error) return serverErrorResponse(error);
        if (rows.length == 1){
            return userErrorResponse("Nama bioskop sudah ada", res);
        }

        conn.query(query, data, function(error, rows){
            if (error) return serverErrorResponse(error);

            return successResponse("Bioskop telah dimasukkan", res);
        })
    })
}