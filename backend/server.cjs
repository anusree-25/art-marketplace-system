// server.cjs

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(__dirname, "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

async function startServer() {
  try {
    // MySQL connection
    const db = await mysql.createConnection({
      host: "localhost",
      user: "art_user",             // MySQL user we created
      password: "anusree@2005*62",  // password
      database: "digital_art"
    });
    console.log("✅ Database connected");

    // ---------------- LOGIN ----------------
    app.post("/api/login", async (req, res) => {
      const { email, password } = req.body;
      try {
        const [rows] = await db.query(
          "SELECT * FROM users WHERE email=? AND password=?",
          [email, password]
        );
        if (rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });
        res.json({ user: rows[0] });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
      }
    });

    // ---------------- REGISTER ----------------
    app.post("/api/register", async (req, res) => {
      const { name, email, password, role } = req.body;
      try {
        await db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          [name, email, password, role]
        );
        res.json({ message: "Registered successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
      }
    });

    // ---------------- GET ARTWORKS ----------------
    app.get("/api/artworks", async (req, res) => {
      try {
        const [rows] = await db.query("SELECT * FROM artworks");
        res.json(rows);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cannot fetch artworks" });
      }
    });

    // ---------------- ADD ARTWORK ----------------
    app.post("/api/artworks", upload.single("image"), async (req, res) => {
      try {
        const { title, description, price, artist_id, is_auction, auction_end } = req.body;
        if (!req.file) return res.status(400).json({ error: "Image is required" });

        const image_path = `/uploads/${req.file.filename}`;

        const [result] = await db.query(
          "INSERT INTO artworks (title, description, price, image_path, artist_id, is_auction, auction_end) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [title, description, price, image_path, artist_id, is_auction || 0, auction_end || null]
        );

        res.status(201).json({ message: "Artwork uploaded successfully", art_id: result.insertId, image_path });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
      }
    });

    // ---------------- DELETE ARTWORK ----------------
    app.delete("/api/artworks/:id", async (req, res) => {
      try {
        const art_id = req.params.id;
        const [result] = await db.query("DELETE FROM artworks WHERE art_id=?", [art_id]);
        if (result.affectedRows === 0) return res.status(404).json({ error: "Artwork not found" });
        res.json({ message: "Artwork deleted successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cannot delete artwork" });
      }
    });

    // ---------------- PLACE ORDER / BUY ARTWORK ----------------
    app.post("/api/orders", async (req, res) => {
      try {
        const { art_id, user_id } = req.body;
        await db.query("INSERT INTO orders (art_id, user_id) VALUES (?, ?)", [art_id, user_id]);
        await db.query("DELETE FROM artworks WHERE art_id=?", [art_id]);
        res.json({ message: "Purchase successful and artwork removed from marketplace" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cannot place order" });
      }
    });

    // ---------------- PLACE BID ----------------
    app.post("/api/bids", async (req, res) => {
      try {
        const { art_id, user_id, bid_amount } = req.body;
        await db.query("INSERT INTO bids (art_id, user_id, bid_amount) VALUES (?, ?, ?)", [art_id, user_id, bid_amount]);
        res.json({ message: "Bid placed" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Cannot place bid" });
      }
    });

    app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
  } catch (err) {
    console.error("❌ Failed to connect database:", err);
  }
}

startServer();
