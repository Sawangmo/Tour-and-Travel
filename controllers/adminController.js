// controllers/adminController.js
const pool = require('../config/db'); // Ensure this points to your database config

const getBookingManagement = async (req, res) => {
  try {
    console.log("🔍 Admin bookings page accessed");
    const result = await pool.query('SELECT * FROM bookings');
    const bookings = result.rows;
    res.render('pages/admin', { bookings });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = { getBookingManagement };
