var mysql = require('mysql');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
const conn = require('../middleware/connection');

var error1 = "hello";

function serverErrorResponse(error1, error) {
     return response.serverError(error1, error);
}

function successResponse(message, res){
     return response.success(message, res)
}

function userErrorResponse(message, res){
     return response.failed(message, res)
}

//controller untuk registrasi user
exports.registrasi = function (req, res) {
     var post = {
          nama: req.body.nama,
          password: req.body.password,
          nomorhp: req.body.nomorhp,
     }

     var query = "SELECT nomorhp FROM users WHERE nomorhp = ?";
     var table = [post.nomorhp];

     queryCekNomorHp = mysql.format(query, table);

     // Kalau ada yang kosong
     if (post.nama == null || post.password == null || post.nomorhp == null){
        return userErrorResponse("Masukkan nomorhp, nama, dan password")
     }

     conn.query(queryCekNomorHp, function(error, rows){
        if(error){
            return serverErrorResponse(error1, error);
        } else {
            // Kalau user belum ada
            if (rows.length == 0){
                var queryInsertData = "INSERT INTO users(nama, password, nomorhp) VALUES(?, ?, ?)"
                var table = [post.nama, post.password, post.nomorhp];

                conn.query(queryInsertData, table, function(error, result){
                    if (error) return serverErrorResponse(error1, error);
                    return successResponse("Pendaftaran berhasil", res);
                })
            } else {
                return userErrorResponse("Nomor HP terlah terdaftar", res);
            }
        }
     })

}

// controller untuk login
exports.login = function (req, res) {
    var post = {
         nomorhp: req.body.nomorhp,
         password: req.body.password
    }

    if (post.nomorhp == null || post.password == null){
         return userErrorResponse("Nomorhp dan password tidak boleh kosong", res)
    }

    var query = "SELECT id_user, nama, nomorhp, password FROM users WHERE nomorhp=? AND password=?";
    var table = [post.nomorhp, post.password];

    queryCekData = mysql.format(query, table);

    conn.query(queryCekData, function (error, rows) {
         if (error) return serverErrorResponse(error1, error);

         if (rows.length == 1) {
              var token = jwt.sign({rows}, config.secretKey);

              return res.status(200).json({
                   "status": 200,
                   "token": token
              })
         } else {
              return userErrorResponse("Nomorhp atau password salah", res)
         }
    })
};