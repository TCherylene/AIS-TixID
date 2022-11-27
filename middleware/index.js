var express = require('express');
var auth = require('./auth');
var router = express.Router();
// var verifikasi = require('./verifikasi')
// var jsonku = require('./logged_in');

router.get('/', (req, res) => {
    res.send("Hello world!");
})

// Registrasi
router.post('/profile', auth.registrasi);

// Login
router.post('/login', auth.login);

/*  -------------- CONTOH ------------------
// GET pembelian - melihat history pembayaran
router.get('/pembelian/:id_user', verifikasi(), jsonku.cekPembayaran);
router.get('/pembelian/:id_user/:id_pembelian', verifikasi(), jsonku.cekIDPembayaran);

// POST transaksi - untuk melakukan pembayaran
router.post('/transaksi', jsonku.transaksi)
*/ 

module.exports = router;