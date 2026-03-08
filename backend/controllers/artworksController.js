const db = require('../db');

exports.uploadArtwork = (req, res) => {
  const { title, description, price, cat_id, is_auction, auction_end, artist_id } = req.body;
  const image_path = '/uploads/' + req.file.filename;

  db.query(`INSERT INTO Artworks 
    (title, description, price, image_path, artist_id, cat_id, is_auction, auction_end) 
    VALUES (?,?,?,?,?,?,?,?)`,
    [title, description, price, image_path, artist_id, cat_id, is_auction, auction_end],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Artwork uploaded successfully' });
    });
};

exports.getAllArtworks = (req, res) => {
  db.query(`SELECT a.*, u.name AS artist_name, c.category_name 
            FROM Artworks a 
            JOIN Users u ON a.artist_id=u.user_id
            JOIN Categories c ON a.cat_id=c.cat_id`,
    (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json(results);
    });
};
