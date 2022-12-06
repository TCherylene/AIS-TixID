-- SELECT GABUNGAN HISTORY & PEMBELIAN
SELECT * FROM history AS hs 
JOIN pembelian AS pb 
ON hs.id_pembelian = pb.id_pembelian 
WHERE id_user = xxx

-- SELECT GABUNGAN FILM & BIOSKOP
SELECT * FROM film AS fl
JOIN bioskop AS bs
ON bs.id_bioskop = fl.id_bioskop
WHERE id_film = xxx

-- SELECT GABUNGAN users & role
SELECT * FROM users AS us
JOIN jabatan AS jb 
ON us.role_user = jb.jabatan
WHERE id_user = xxx

-- SELECT GABUNGAN history & film
SELECT harga_tiket FROM history AS hs 
JOIN film AS fi 
ON fi.id_film = hs.id_film
WHERE id_user = xxx