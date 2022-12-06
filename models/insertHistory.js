const conn = require('../middleware/connection2');
var mysql = require('mysql');

function insertHistory(idPembelian){
    var query = "INSERT INTO history(id_pembelian) VALUES (?)"
    var data = [idPembelian];

    var queryInsertData = mysql.format(query, data);

    conn.query(queryInsertData, function(error, rows, field){
        if(error) {
            console.log("Data history tidak tersimpan");
            throw error;
        }

        console.log("Data history tersimpan");
    })
}

module.exports = insertHistory;