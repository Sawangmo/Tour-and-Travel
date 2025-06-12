require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let info = await transporter.sendMail({
    from: `"Tour & Travel" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: 'Test Email',
    text: 'This is a test email from Tour & Travel app',
  });

  console.log('Test email sent:', info.response);
}

testEmail().catch(console.error);
