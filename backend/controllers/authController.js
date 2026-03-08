const db = require('../db');
const bcrypt = require('bcrypt');

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM Users WHERE email = ?', [email], async (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0) return res.status(401).json({ message: 'User not found' });

    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(401).json({ message: 'Wrong password' });

    res.json({ role: results[0].role, user_id: results[0].user_id });
  });
};

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query('INSERT INTO Users (name,email,password,role) VALUES (?,?,?,?)',
    [name, email, hash, role], (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      res.json({ message: 'User created successfully' });
    });
};
