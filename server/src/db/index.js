require('dotenv').config();
const { Pool } = require('pg');


console.log("🔍 ENV loaded:", {
  user: process.env.DB_USER,
  db: process.env.DB_NAME,
});

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
});

module.exports = pool;
