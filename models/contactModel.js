// models/contactModel.js
const db = require('../config/db');

const Contact = {
  saveMessage: async (name, email, phone, subject, message) => {
    return db.none(
      'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES ($1, $2, $3, $4, $5)',
      [name, email, phone, subject, message]
    );
  }
};

module.exports = Contact;
