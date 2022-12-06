const conn = require('../middleware/connection2');
var mysql = require('mysql');

function updatePembelian(status, idBeli){
    var query = "UPDATE pembelian SET status_pembelian = ? WHERE id_pembelian = ?"
    var data = [status, idBeli];

    var queryInsertData = mysql.format(query, data);

    conn.query(queryInsertData, function(error, rows){
        if(error) {
            console.log("Data gagal terupdate");
            throw error;
        }

        console.log("Data sudah terupdate");
    })
}

module.exports = updatePembelian;