const db = require('../db');

exports.placeBid = (req, res) => {
  const { user_id, art_id, bid_amount } = req.body;

  db.query('INSERT INTO Bids (art_id,user_id,bid_amount) VALUES (?,?,?)', [art_id,user_id,bid_amount],
    (err) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'Bid placed successfully!' });
    });
};
