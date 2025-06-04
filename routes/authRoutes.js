const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController'); // ✅ Correct path

router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', authController.getLogin);       
router.post('/login', authController.postLogin);     
router.get('/signup', authController.getSignup);     
router.post('/signup', authController.postSignup); 
router.get('/verify-email', authController.verifyEmail);

// Logout route
router.get('/logout', authController.logout);

//  Email Verification Route 
router.get('/verify', async (req, res) => {
  const { token } = req.query;

  try {
    const result = await db.query('UPDATE users SET is_verified = true, verification_token = null WHERE verification_token = $1 RETURNING *', [token]);

    if (result.rowCount === 0) {
      return res.send('Invalid or expired token.');
    }

    res.send('Email verified! You can now <a href="/login">login</a>.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Verification failed.');
  }
});


module.exports = router;
