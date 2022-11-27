var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verifikasi = require('../middleware/verifikasi')
var myapp = require('./logged_in');

router.get('/', (req, res) => {
    res.send("Hello world!");
})

// Registrasi
router.post('/profile', auth.registrasi);

// POST login
router.post('/login', auth.login);

// GET profil - Menampilkan informasi akun
router.get('/profil', verifikasi(), myapp.profil)

// GET Film - Menampilkan informasi film
router.get('/film', myapp.film);
router.get('/film/:id_film', myapp.filmById);

// GET History - Menampilkan informasi history pembelian
router.get('/history', verifikasi(), myapp.history);
router.get('/history/:id_history', verifikasi(), myapp.historyById);

module.exports = router;