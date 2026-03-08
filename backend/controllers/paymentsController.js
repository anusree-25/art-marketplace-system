const db = require('../db');

exports.getAllPayments = (req,res) => {
  db.query('SELECT * FROM Payments', (err, results) => {
    if(err) return res.status(500).json({message:err.message});
    res.json(results);
  });
};
