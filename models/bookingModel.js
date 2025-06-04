const db = require('../config/db');

exports.createBooking = async ({ packageId, guests, date, email, phone }) => {
  const query = `
    INSERT INTO bookings (package, guests, date, email, phone)
    VALUES ($1, $2, $3, $4, $5)
  `;
  await db.query(query, [packageId, guests, date, email, phone]);
};
