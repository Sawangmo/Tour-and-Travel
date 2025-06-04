const Contact = require('../models/contactModel');

// GET Contact Page
exports.getContactPage = (req, res) => {
  const message = req.query.success ? 'Message sent successfully!' : null;
  const error = req.query.error ? 'Something went wrong. Please try again.' : null;

  res.render('pages/contact', { message, error });
};

// POST Contact Form Submission
exports.submitContactForm = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    await Contact.saveMessage(name, email, phone, subject, message);
    res.redirect('/contact?success=true');
  } catch (err) {
    console.error('❌ Contact form error:', err.message);
    res.redirect('/contact?error=true');
  }
};
