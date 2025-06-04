// controllers/offerController.js
const db = require('../config/db'); // Assuming you're using db.any here

exports.getSpecialOffer = async (req, res) => {
  try {
    const offers = await db.any('SELECT * FROM special_offers'); // Fetch offers from DB
    res.render('pages/specialOffer', {
      user: req.session.user || null,
      offers: offers || []
    });
  } catch (err) {
    console.error('Special Offer error:', err);
    res.status(500).send('Server error while loading special offers');
  }
};
