const nodemailer = require('nodemailer');
require('dotenv').config(); // Optional if already loaded in main file

const sendVerificationEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verificationLink = `http://localhost:5000/verify?token=${token}`;

  const mailOptions = {
    from: `"Tour & Travel App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Email Verification - Tour & Travel',
    html: `
      <h2>Welcome to Tour & Travel!</h2>
      <p>Please verify your email address by clicking the link below:</p>
      <a href="${verificationLink}">Verify My Email</a>
      <p>This link will expire in 15 minutes.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Verification email sent: ${info.response}`);
  } catch (error) {
    console.error('❌ Failed to send verification email:', error);
  }
};

module.exports = sendVerificationEmail;
