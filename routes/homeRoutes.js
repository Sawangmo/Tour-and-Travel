// routes/homeRoutes.js

const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

// Home route - accessible to everyone
router.get('/home', homeController.getHomePage);

module.exports = router;
