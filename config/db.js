const pgp = require('pg-promise')();
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: 'baby@2025',
};

const db = pgp(dbConfig);
console.log("Loaded DB config:", dbConfig);


module.exports = db;
