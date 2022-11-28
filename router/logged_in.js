'use strict';

var response = require('../res');
var parsetoken = require('../middleware/parseJWT');
const conn = require('../middleware/connection');
var mysql = require('mysql');
// var updateSaldo = require('./update_saldo');
// var insertHistory = require('./insertHistory');
// var insertPembayaran = require('./insertPembayaran');

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
exports.profil = function(req, res){
    var token = req.headers.authorization;
    var data = parsetoken(token)
}

// ----- INFORMASI FILM -----
exports.film = function(req, res){

}

// ----- INFORMASI FILM BY ID -----
exports.filmById = function (req, res){
 
}

// ----- GET HISTORY -----
exports.history = function (req, res){
    var token = req.headers.authorization;
    var dataToken = parsetoken(token);
}

// ----- GET HISTORY BY ID -----
exports.historyById = function (req, res){
    var token = req.headers.authorization;
    var dataToken = parsetoken(token);
}