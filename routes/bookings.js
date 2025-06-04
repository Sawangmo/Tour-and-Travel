const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

let bookings = [
  new Booking(1, 'John Smith', 'Thimphu, Bhutan', 'Cultural Tour', '2024-02-15', 1499, 'Confirmed'),
  new Booking(2, 'Emma Davis', 'Paro, Bhutan', 'Mountain Trek', '2024-03-01', 1749, 'Pending'),
  new Booking(3, 'Michael Wilson', 'Punakha, Bhutan', 'Festival Special', '2024-02-20', 1439, 'Confirmed')
];

router.get('/index', (req, res) => {
  const status = req.query.status || 'All';
  const filtered = status === 'All' ? bookings : bookings.filter(b => b.status === status);
  res.render('index', { bookings: filtered });
});

router.get('/edit/:id', (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  res.render('edit', { booking });
});

router.post('/edit/:id', (req, res) => {
  const index = bookings.findIndex(b => b.id == req.params.id);
  const { customerName, destination, packageName, date, price, status } = req.body;
  bookings[index] = new Booking(
    parseInt(req.params.id),
    customerName,
    destination,
    packageName,
    date,
    parseFloat(price),
    status
  );
  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  res.render('delete', { booking });
});

router.post('/delete/:id', (req, res) => {
  bookings = bookings.filter(b => b.id != req.params.id);
  res.redirect('/');
});

module.exports = router;
