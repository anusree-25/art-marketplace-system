# 🎨 Digital Art Marketplace

## 📌 Project Overview

The **Digital Art Marketplace** is a web-based platform where artists can upload and showcase their digital artworks, and buyers can browse, purchase, or place bids on artworks.

This project demonstrates a full-stack web application using **Node.js, Express.js, MySQL, and a frontend interface**.

---

## 🚀 Features

* User registration and login system
* Artists can upload digital artworks
* Buyers can view and purchase artworks
* Auction system for bidding
* Artwork deletion by artists
* Image upload support
* Artwork listing from database

---

## 🛠 Technologies Used

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express.js

### Database

* MySQL

### Libraries / Tools

* Multer (image upload)
* CORS
* mysql2
* Git & GitHub

---

## 📂 Project Structure

```
digital-art-marketplace
│
├── backend
│   ├── server.cjs
│   ├── db.js
│   └── uploads
│
├── frontend
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

### 1️⃣ Clone the repository

```
git clone https://github.com/anusree-25/art-marketplace-system.git
```

### 2️⃣ Navigate to project folder

```
cd art-marketplace-system
```

### 3️⃣ Install dependencies

```
cd backend
npm install
```

### 4️⃣ Setup MySQL database

Create a database named:

```
digital_art
```

Update database credentials in:

```
backend/server.cjs
```

Example configuration:

```
host: "localhost"
user: "art_user"
password: "your_password"
database: "digital_art"
```

---

### 5️⃣ Run the server

```
node server.cjs
```

Server will start at:

```
http://localhost:5000
```

---

## 📡 API Endpoints

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| POST   | /api/register     | Register user    |
| POST   | /api/login        | User login       |
| GET    | /api/artworks     | Get all artworks |
| POST   | /api/artworks     | Upload artwork   |
| DELETE | /api/artworks/:id | Delete artwork   |
| POST   | /api/orders       | Purchase artwork |
| POST   | /api/bids         | Place bid        |

---

## 👩‍💻 Author

**Anusree M**
B.Tech Computer Science Engineering Student

---

## 📜 License

This project is created for academic and educational purposes.
