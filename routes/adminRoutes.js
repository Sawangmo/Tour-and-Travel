const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { ensureAdmin } = require('../Middleware/authMiddleware');

// Protect all admin routes
router.use(ensureAdmin);

// Admin Dashboard - View all bookings
router.get('/', bookingController.getAdminPage);

// Show Edit Booking Form
router.get('/edit/:id', bookingController.editBookingForm);

// Handle Edit Booking Submission
router.post('/edit/:id', bookingController.updateBooking);

// Delete a Booking
router.post('/delete/:id', bookingController.deleteBooking);

module.exports = router;
