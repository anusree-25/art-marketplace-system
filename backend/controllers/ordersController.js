const db = require('../db');

exports.buyArtwork = (req, res) => {
  const { user_id, art_id, price } = req.body;

  // Insert into Orders
  db.query('INSERT INTO Orders (user_id, art_id) VALUES (?,?)', [user_id, art_id], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });

    // Insert into Payments
    db.query('INSERT INTO Payments (order_id, amount, method) VALUES (?,?,?)',
      [result.insertId, price, 'Card'], (err2) => {
        if (err2) return res.status(500).json({ message: err2.message });

        // Delete artwork after purchase
        db.query('DELETE FROM Artworks WHERE art_id=?', [art_id], () => {});
        res.json({ message: 'Transaction successful!' });
      });
  });
};
