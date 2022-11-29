-- DIGUNAKAN UNTUK PEMBUATAN DATABASE (TANPA DATA)
CREATE TABLE Users (
	id_user int AUTO_INCREMENT,
    nama varchar (30),
    nomorhp varchar (20),
    password varchar (30)
    
    PRIMARY KEY (id_user)
);

CREATE TABLE Bioskop (
	id_bioskop int AUTO_INCREMENT, 
    nama_bioskop varchar(50),
    
    PRIMARY KEY (id_bioskop)
);

CREATE TABLE Film (
	id_film int AUTO_INCREMENT,
    judul_film varchar(50),
    tanggal_film date,
    waktu_film time,
    id_bioskop int,
    harga_tiket int
    
    PRIMARY KEY (id_film)
);

CREATE TABLE Pembelian (
	id_pembelian int AUTO_INCREMENT,
    id_user int,
    id_film int,
    jumlah_tiket tinyint,
    tanggal_pembelian date DEFAULT CURRENT_TIMESTAMP,
    waktu_pembelian time DEFAULT CURRENT_TIMESTAMP,
    status_pembelian tinyint,
    
    PRIMARY KEY (id_pembelian)
);

CREATE TABLE History (
	id_history int AUTO_INCREMENT,
    id_pembelian int,
    
    PRIMARY KEY (id_history)
);

-- ADD FOREIGN KEY
ALTER TABLE film
ADD FOREIGN KEY (id_bioskop) REFERENCES bioskop(id_bioskop);

ALTER TABLE pembelian
ADD FOREIGN KEY (id_user) REFERENCES users(id_user),
ADD FOREIGN KEY (id_film) REFERENCES film(id_film);

ALTER TABLE history
ADD FOREIGN KEY (id_pembelian) REFERENCES pembelian(id_pembelian);