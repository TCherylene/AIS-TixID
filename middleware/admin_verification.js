const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const parseJWT = require('./parseJWT');
var response = require('../res');

function userErrorResponse(message, res){
    return response.failed(message, res)
}

function admin_verification(){
    return function(req, rest, next){
        //cek authorization header
        var tokenWithBearer = req.headers.authorization;
        
        if(tokenWithBearer) {
            var token = tokenWithBearer.split(' ')[1];
            
            //verifikasi
            jwt.verify(token, config.secret, function(err, decoded){
                // Token salah
                var hasil = parseJWT(token);

                if(err){
                    return userErrorResponse("Token salah", rest)
                }else {
                    if (hasil.role_user == 0){
                        return userErrorResponse("Akses ditolak", rest)
                    }
                    // Token benar
                    next();
                }
            });
        }else {
            return userErrorResponse("Masukkan Token", rest)
        }
    }
}

module.exports = admin_verification