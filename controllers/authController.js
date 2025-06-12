const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendVerificationEmail = require('../utils/sendVerificationEmail');
const db = require('../config/db');
require('dotenv').config();

// GET Login Page
exports.getLogin = (req, res) => {
  res.render('pages/login', { message: null });
};

// POST Login
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    if (!user) {
      return res.render('pages/login', { message: 'Invalid email or password.' });
    }

    if (!user.is_verified) {
      return res.render('pages/login', { message: 'Please verify your email before logging in.' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.render('pages/login', { message: 'Invalid email or password.' });
    }

    req.session.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      username: user.name || user.username
    };

    return res.redirect(user.role === 'admin' ? '/admin' : '/home');

  } catch (error) {
    console.error('Login error:', error);
    return res.render('pages/login', { message: 'Something went wrong. Please try again.' });
  }
};

// GET Signup Page
exports.getSignup = (req, res) => {
  res.render('pages/signup', { message: null });
};

// POST Signup
exports.postSignup = async (req, res) => {
  const { username, email, password } = req.body;
  const role = 'user';
  const token = crypto.randomBytes(32).toString('hex');
  const tokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

  try {
    if (!username || !email || !password) {
      return res.render('pages/signup', { message: 'All fields are required.' });
    }

    const existingUser = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser) {
      return res.render('pages/signup', { message: 'Email already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.none(
      `INSERT INTO users (name, email, password, role, is_verified, verification_token, token_expires, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
      [username, email, hashedPassword, role, false, token, tokenExpires]
    );

    console.log(`Verification link: http://localhost:5000/verify-email?token=${token}`);
    await sendVerificationEmail(email, token);

    res.send('Signup successful! Please check your email to verify your account.');

  } catch (error) {
    console.error('Signup error:', error);
    res.render('pages/signup', { message: 'Signup failed. Please try again.' });
  }
};

// GET Verify Email
exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).send('Verification token missing.');
  }

  try {
    const user = await db.oneOrNone(
      `SELECT * FROM users WHERE verification_token = $1 AND token_expires > NOW()`,
      [token]
    );

    if (!user) {
      return res.status(400).send('Invalid or expired token.');
    }

    await db.none(
      `UPDATE users SET is_verified = true, verification_token = NULL, token_expires = NULL WHERE id = $1`,
      [user.id]
    );

    res.send('✅ Email verified successfully! You can now log in.');

  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).send('Email verification failed.');
  }
};

// GET Dashboard
exports.getDashboard = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  res.render('pages/dashboard', { user: req.session.user });
};

// Logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).send('Could not log out. Try again.');
    }
    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
};
