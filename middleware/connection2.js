var mysql = require('mysql');

// Create a connection
var conn = 
  mysql.createConnection({
    host: "sql6.freemysqlhosting.net", 
    port: "3306",
    user: "sql6582798", 
    password: "wxrTI5IcJh",
    database: "sql6582798"
  });

conn.connect(function(err, conn){
    if(err) {
        console.log("MySQL tidak terkoneksi");
    }
    if(conn) console.log("MySQL terkoneksi");
})

module.exports = conn;