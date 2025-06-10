// app.js
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey',
  resave: false,
  saveUninitialized: true,
}));

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Set user for all views
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// Route imports
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const homeRoutes = require('./routes/homeRoutes');
const offerRoutes = require('./routes/offerRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const contactRoutes = require('./routes/contactRoutes');
const bookingsRoute = require('./routes/bookings');

app.get('/', (req, res) => {
  res.render('pages/landing'); // Renders the landing.ejs page
});

// Use routes
app.use('/', authRoutes);
app.use('/', homeRoutes);
app.use('/', offerRoutes);
app.use('/', bookingRoutes);
app.use('/services', serviceRoutes);
app.use('/', contactRoutes);
app.use('/', bookingsRoute);



// Custom Routes
app.get('/specialOffers', (req, res) => {
  const offers = [
    {
      id: 1,
      title: 'Bhutan Cultural Tour',
      image_url: '/img/thimphu-bhutan-1623948061-lb.jpg',
      description: 'Enjoy the blooming beauty of Bhutan in spring.',
      location: 'Thimphu, Bhutan',
      duration: '5 Days',
      price: 350,
      discount_price: 299,
      rating: 4.7
    },
    {
      id: 2,
      title: 'Mountain Trek Adventure',
      image_url: '/img/bhutan-trekking-tours-from-india.jpg',
      description: 'Thrilling adventures in the Himalayas.',
      location: 'Haa Valley',
      duration: '7 Days',
      price: 420,
      discount_price: 370,
      rating: 4.8
    },
    {
      id: 3,
      title: 'Festival Special Package',
      image_url: '/img/Festival-of-Bhutan.jpg',
      description: 'Dive deep into Bhutanese traditions and festivals.',
      location: 'Paro',
      duration: '4 Days',
      price: 390,
      discount_price: 330,
      rating: 4.6
    }
  ];
  res.render('pages/specialOffers', { title: 'Special Offers', offers });
});

app.get('/specialoffer', (req, res) => {
  res.render('pages/specialoffer', { title: 'Special Offer Page', user: req.session.user || null });
});

app.get('/booking', (req, res) => {
  res.render('pages/booking');
});

app.get('/confirmation', (req, res) => {
  res.render('pages/confirmation', { title: 'Booking Confirmation' });
});



// Admin dashboard access control
app.get('/admin', (req, res) => {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.redirect('/login');
  }
  res.render('pages/admin', { user: req.session.user });
});

// 404 handler
app.use((req, res) => {
  res.status(404).send('404 - Page not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
