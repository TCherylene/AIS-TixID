const conn = require('../middleware/connection2');
var mysql = require('mysql');

var insertHistory = require('./insertHistory');

function insertPembelian(id_user, id_film, jumlah_tiket){
    var query = "INSERT INTO pembelian(id_user, id_film, jumlah_tiket, status_pembelian) VALUES (?, ?, ?, 0)"
    var data = [id_user, id_film, jumlah_tiket];

    var queryInsertData = mysql.format(query, data);

    conn.query(queryInsertData, function(error, rows){
        if(error) {
            console.log("Data pembelian tidak tersimpan");
            throw error;
        }

        console.log("Data pembelian tersimpan");
        insertHistory(rows.insertId);
    })
}

module.exports = insertPembelian;