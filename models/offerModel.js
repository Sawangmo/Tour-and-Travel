// models/offerModel.js
const db = require('../config/db'); // pg-promise or any db client

// Get all special offers
exports.getAllOffers = async () => {
    try {
        const offers = await db.any('SELECT * FROM special_offers');
        return offers;
    } catch (err) {
        throw err;
    }
};
