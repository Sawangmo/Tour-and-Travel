const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');

router.get('/specialOffer', offerController.getSpecialOffer);


module.exports = router;
