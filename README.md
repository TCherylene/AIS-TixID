# AIS-TixID
Repository ini digunakan sebagai penyelesaian FP Arsitektur dan Integrasi Sistem B Departemen Teknologi Informasi ITS

[Dokumentasi yang digunakan sebagai acuan](https://docs.google.com/document/d/1InSXXYhRAPO0Ge1W9H6nsr4ppjMvyMzHahXZF7tnt44/edit#)

PROGRESS: 29 Nov 2022

## Finished

Database selesai.

API:

- Login
- Sign Up
- Mendapatkan informasi film (`GET /film` & `GET /film/:id`)
- Mendapatkan history (`GET /history` & `GET /history/:id`)
- *Melakukan request pembayaran ke DANA (`POST /pembelian`)* -- Bersifat sebagai ***backup*** apabila tidak bisa dilakukan dengan socket

## In Progress

- Pembuatan backup API untuk `GET /transaksi`

Socket:

- Mendapatkan hasil transaksi terakhir (`GET /transaksi`)
- Melakukan request pembayaran ke DANA (`POST /pembelian`)

Messaging to email:

- Registrasi berhasil (`POST /profil`)
- Pembayaran Berhasil

## Belum berjalan

Others:

- Integrasi dengan DANA (kelompok 6)
