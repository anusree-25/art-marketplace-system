const db = require('../db');

// This function checks ended auctions and finalizes them
exports.finalizeAuctions = () => {
  const now = new Date();

  // 1️⃣ Find all artworks whose auction has ended
  db.query('SELECT * FROM Artworks WHERE is_auction=1 AND auction_end <= ?', [now], (err, artworks) => {
    if (err) return console.error('Auction finalize error:', err);

    artworks.forEach(art => {
      // 2️⃣ Find highest bid for this artwork
      db.query('SELECT user_id, MAX(bid_amount) AS max_bid FROM Bids WHERE art_id=?', [art.art_id], (err2, result) => {
        if (err2) return console.error(err2);
        if (result.length === 0 || result[0].max_bid === null) {
          console.log(`No bids for artwork ${art.art_id}, auction ended.`);
          return;
        }

        const winner_id = result[0].user_id;
        const bid_amount = result[0].max_bid;

        // 3️⃣ Insert order for the winner
        db.query('INSERT INTO Orders (user_id, art_id) VALUES (?,?)', [winner_id, art.art_id], (err3, orderRes) => {
          if (err3) return console.error(err3);

          // 4️⃣ Insert payment
          db.query('INSERT INTO Payments (order_id, amount, method) VALUES (?,?,?)', [orderRes.insertId, bid_amount, 'Card'], (err4) => {
            if (err4) return console.error(err4);

            // 5️⃣ Delete artwork from Artworks table
            db.query('DELETE FROM Artworks WHERE art_id=?', [art.art_id], () => {
              console.log(`Auction finalized: Artwork ${art.art_id} sold to user ${winner_id} for ${bid_amount}`);
            });
          });
        });
      });
    });
  });
};
