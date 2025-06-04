// routes/bookingRoutes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.get('/booking', bookingController.getBookingPage);
router.post('/booking', bookingController.postBooking);

// Admin route
router.get('/admin', bookingController.getAdminPage);
router.get('/admin/edit/:id', bookingController.editBookingForm);
router.post('/admin/edit/:id', bookingController.updateBooking);
router.post('/admin/delete/:id', bookingController.deleteBooking);

router.get('/confirmation', (req, res) => {
    res.render('pages/confirmation', { title: 'Booking Confirmation' });
});

router.post('/', async (req, res) => {
    console.log('Received form data:', req.body); // 👈 add this
  
    const { package, guests, date, email, phone } = req.body;
  
    try {
      await pool.query(
        'INSERT INTO bookings (package, guests, date, email, phone) VALUES ($1, $2, $3, $4, $5)',
        [package, guests, date, email, phone]
      );
      res.redirect('/booking-success');
    } catch (error) {
      console.error('❌ Booking submission error:', error);
      res.status(500).send('Booking failed.');
    }
});
  

module.exports = router;
