var express = require('express');
var router = express.Router();
var verifikasi = require('../middleware/verifikasi')
var auth = require('./auth');
var jsonku = require('./logged_in');

router.get('/', (req, res) => {
    res.send("Hello world!");
})

// Registrasi
router.post('/profil', auth.registrasi);

// POST login
router.post('/login', auth.login);

// GET profil - Menampilkan informasi akun
router.get('/profil', verifikasi(), jsonku.profil)

// GET Film - Menampilkan informasi film
router.get('/film', jsonku.film);
router.get('/film/:id_film', jsonku.filmById);

// GET History - Menampilkan informasi history pembelian
router.get('/history', verifikasi(), jsonku.history);
router.get('/history/:id_history', verifikasi(), jsonku.historyById);

module.exports = router;