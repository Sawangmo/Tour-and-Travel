const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

router.get('/contact', contactController.getContactPage);
router.post('/contact', contactController.submitContactForm);

module.exports = router;
