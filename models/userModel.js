const db = require('../config/db');

// Create the users table with email verification support
const createUserTable = async () => {
  try {
    await db.none(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL CHECK (email LIKE '%@%.%'),
        password VARCHAR(255) NOT NULL,

        role VARCHAR(10) DEFAULT 'user' 
          CHECK (role IN ('user', 'admin')),

        -- Email verification
        is_verified BOOLEAN DEFAULT false,
        verification_token TEXT,
        token_expires TIMESTAMP,

        -- Optional: password reset functionality
        reset_token TEXT,
        reset_expires TIMESTAMP,

        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ 'users' table ensured with email verification support.");
  } catch (err) {
    console.error("❌ Error creating users table:", err.message || err);
  }
};

module.exports = {
  createUserTable
};
