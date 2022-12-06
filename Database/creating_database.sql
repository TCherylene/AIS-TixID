-- DIGUNAKAN UNTUK PEMBUATAN DATABASE (TANPA DATA)
CREATE TABLE users (
	id_user int AUTO_INCREMENT,
    nama varchar (30),
    nomorhp varchar (20),
    password varchar (30),
    role_user tinyint,
    
    PRIMARY KEY (id_user)
);

CREATE TABLE jabatan(
    jabatan tinyint,
    nama_role varchar(10),

    PRIMARY KEY (role)
)

CREATE TABLE bioskop (
	id_bioskop int AUTO_INCREMENT, 
    nama_bioskop varchar(50),
    
    PRIMARY KEY (id_bioskop)
);

CREATE TABLE film (
	id_film int AUTO_INCREMENT,
    judul_film varchar(50),
    tanggal_film date,
    waktu_film time,
    id_bioskop int,
    harga_tiket int,
    
    PRIMARY KEY (id_film)
);

CREATE TABLE pembelian (
	id_pembelian int AUTO_INCREMENT,
    id_user int,
    id_film int,
    jumlah_tiket tinyint,
    tanggal_pembelian DATETIME DEFAULT CURRENT_TIMESTAMP,
    status_pembelian tinyint, 
    
    PRIMARY KEY (id_pembelian)
);

CREATE TABLE history (
	id_history int AUTO_INCREMENT,
    id_pembelian int,
    
    PRIMARY KEY (id_history)
);

-- ADD FOREIGN KEY
ALTER TABLE users
ADD FOREIGN KEY (role_user) REFERENCES jabatan(jabatan);

ALTER TABLE film
ADD FOREIGN KEY (id_bioskop) REFERENCES bioskop(id_bioskop);

ALTER TABLE pembelian
ADD FOREIGN KEY (id_user) REFERENCES users(id_user),
ADD FOREIGN KEY (id_film) REFERENCES film(id_film);

ALTER TABLE history
ADD FOREIGN KEY (id_pembelian) REFERENCES pembelian(id_pembelian);