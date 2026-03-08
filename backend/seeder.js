// seeder.js
const db = require('./db');
const bcrypt = require('bcryptjs');

async function seed(){
  try {
    const pass1 = await bcrypt.hash('buyerpass', 10);
    const pass2 = await bcrypt.hash('artistpass', 10);

    await db.query('INSERT IGNORE INTO Users (name,email,password,role) VALUES (?,?,?,?)', ['Alice','alice@example.com',pass1,'buyer']);
    await db.query('INSERT IGNORE INTO Users (name,email,password,role) VALUES (?,?,?,?)', ['Bob','bob@example.com',pass2,'artist']);

    const cats = ['Painting','Sketch','3D'];
    for(const c of cats){
      await db.query('INSERT IGNORE INTO Categories (category_name) VALUES (?)', [c]);
    }

    console.log('Seed complete');
    process.exit(0);
  } catch(e){ console.error(e); process.exit(1); }
}
seed();
