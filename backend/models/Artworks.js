const db = require('../db');

exports.getAllArtworks = (callback) => {
  const sql = `SELECT a.*, u.name AS artist_name, c.category_name 
               FROM Artworks a 
               JOIN Users u ON a.artist_id=u.user_id
               JOIN Categories c ON a.cat_id=c.cat_id`;
  db.query(sql, callback);
};
