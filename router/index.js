var express = require('express');
var router = express.Router();
var verifikasi = require('../middleware/verifikasi');
var admin_verification = require('../middleware/admin_verification');
var auth = require('./auth');
var users = require('./users');
var admin = require('./admin');

router.get('/', (req, res) => {
    res.send("Hello world!");
})

// ----------------------------- API -----------------------------

// Registrasi
router.post('/profil', auth.registrasi);

// POST login
router.post('/login', auth.login);

// GET profil - Menampilkan informasi akun
router.get('/profil', verifikasi(), users.profil)

// GET Film - Menampilkan informasi film
router.get('/film', users.film);
router.get('/film/:id', users.filmById);

// GET Bioskop - Menampilkan informasi bioskop
router.get('/bioskop', users.bioskop);
router.get('/bioskop', users.bioskopByID);

// GET History - Menampilkan informasi history pembelian
router.get('/history', verifikasi(), users.history);
router.get('/history/:id', verifikasi(), users.historyById);

// GET PEMBELIAN
router.post('/pembelian', verifikasi(), users.pembelian);

// ----------------------------- ADMIN -----------------------------
router.post('/film', admin_verification(), admin.film);
router.post('/bioskop', admin_verification(), admin.bioskop);

router.get('/allhistory', admin_verification(), admin.history);
router.get('/allhistory/:iduser', admin_verification(), admin.historyUser);
router.get('/allhistory/:iduser/:idhistory', admin_verification(), admin.historyUserID);

module.exports = router;