const bookingModel = require('../models/bookingModel');
const db = require('../config/db');

// Render the booking page with available packages
exports.getBookingPage = (req, res) => {
  const packages = [
    { id: 1, title: 'Bhutan Cultural Tour', price: 1100 },
    { id: 2, title: 'Mountain Trek Adventures', price: 1450 },
    { id: 3, title: 'Festival Special Package', price: 1250 }
  ];

  res.render('pages/booking', {
    title: 'Booking Page',
    packages
  });
};

// Handle booking form submission
exports.postBooking = async (req, res) => {
  try {
    const { package, guests, date, email, phone } = req.body;

    await db.query(
      'INSERT INTO bookings (package, guests, date, email, phone) VALUES ($1, $2, $3, $4, $5)',
      [package, guests, date, email, phone]
    );

    res.render('pages/confirmation', {
      title: 'Booking Confirmed',
      message: 'Your booking was submitted successfully!'
    });
  } catch (err) {
    console.error('❌ Booking submission error:', err);
    res.status(500).render('pages/confirmation', {
      title: 'Booking Failed',
      message: 'Booking failed. Please try again.'
    });
  }
};

// Admin dashboard to show all bookings
exports.getAdminPage = async (req, res) => {
  try {
    const bookings = await db.query('SELECT * FROM bookings ORDER BY id DESC');
    res.render('pages/admin', {
        title: 'Admin Dashboard',
        bookings,
        user: req.session.user || null
    });
  } catch (err) {
    console.error('Admin page load error:', err);
    res.status(500).send('Server Error');
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM bookings WHERE id = $1', [id]);
    res.redirect('/admin');
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send('Could not delete booking');
  }
};

// Render edit form
exports.editBookingForm = async (req, res) => {
    const bookingId = req.params.id;
    try {
        const booking = await db.oneOrNone('SELECT * FROM bookings WHERE id = $1', [bookingId]);
    
        if (!booking) {
          return res.status(404).send('Booking not found');
        }
    
        res.render('pages/editBooking', {
          title: 'Edit Booking',
          booking,
          user: req.session.user || null
        });
  } catch (err) {
    console.error('Edit booking error:', err);
    res.status(500).send('Error loading booking for edit');
  }
};

// Handle update
exports.updateBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const { package, guests, date, email, phone, status } = req.body;

    await db.query(
      `UPDATE bookings 
       SET package = $1, guests = $2, date = $3, email = $4, phone = $5, status = $6
       WHERE id = $7`,
      [package, guests, date, email, phone, status, id]
    );

    res.redirect('/admin');
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).send('Could not update booking');
  }
};
