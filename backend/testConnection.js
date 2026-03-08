const db = require('./db');

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('✅ Database connected successfully!');
    console.log(rows);
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  } finally {
    process.exit();
  }
})();
