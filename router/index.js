var express = require('express');
var router = express.Router();
var verifikasi = require('../middleware/verifikasi')
var auth = require('./auth');
var jsonku = require('./logged_in');

router.get('/', (req, res) => {
    res.send("Hello world!");
})

// ----------------------------- API -----------------------------

// Registrasi
router.post('/profil', auth.registrasi);

// POST login
router.post('/login', auth.login);

// GET profil - Menampilkan informasi akun
router.get('/profil', verifikasi(), jsonku.profil)

// GET Film - Menampilkan informasi film
router.get('/film', jsonku.film);
router.get('/film/:id', jsonku.filmById);

// GET History - Menampilkan informasi history pembelian
router.get('/history', verifikasi(), jsonku.history);
router.get('/history/:id', verifikasi(), jsonku.historyById);

// ----------------------------- BACKUP API -----------------------------

// GET PEMBELIAN - SEMENTARA AJA BUAT NGETES INSERT PEMBELIAN :)
router.post('/pembelian', verifikasi(), jsonku.pembelian);

module.exports = router;