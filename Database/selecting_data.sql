-- SELECT GABUNGAN HISTORY & PEMBELIAN
SELECT * FROM history AS hs 
JOIN Pembelian AS pb 
ON hs.id_pembelian = pb.id_pembelian 
WHERE id_user = xxx

-- SELECT GABUNGAN FILM & BIOSKOP
SELECT * FROM film AS fl
JOIN bioskop AS bs
ON bs.id_bioskop = fl.id_bioskop
WHERE id_film = xxx