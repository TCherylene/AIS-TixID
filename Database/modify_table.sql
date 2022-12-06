CREATE TABLE jabatan(
    jabatan tinyint,
    nama_role varchar(10),

    PRIMARY KEY (jabatan)
);

ALTER TABLE users
ADD role_user tinyint,
ADD FOREIGN KEY (role_user) REFERENCES jabatan(jabatan);