const db = require('../config/db'); // Make sure this points to your pg-promise connection

// Fetch all featured travel packages
exports.getFeaturedPackages = async () => {
  return await db.any('SELECT id, name, description, price FROM packages WHERE is_featured = true LIMIT 3');
};

// Fetch all services
exports.getServices = async () => {
  return await db.any('SELECT id, title, description FROM services');
};

// Fetch all destinations
exports.getDestinations = async () => {
  return await db.any('SELECT id, name, image_url FROM destinations');
};
