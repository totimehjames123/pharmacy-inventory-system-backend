const nodemailer = require('nodemailer');
const usersCollection = require('../models/users');

const sendResetPasswordEmail = async (email, verificationCode) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use any email service
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'KINGDOM HERBAL CENTER: Password Reset Verification Code',
    text: `You requested a password reset. Use the following verification code to reset your password: ${verificationCode}`,
  };

  await transporter.sendMail(mailOptions);
};

const forgotPasswordRoute = async (req, res) => {
  const { email } = req.body;

  const user = await usersCollection.findOne({ email });

  if (!user) {
    return res.send({ message: 'Email not found', status: 404 });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  user.resetPasswordToken = verificationCode;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

  await user.save();

  try {
    await sendResetPasswordEmail(email, verificationCode);
    res.send({ message: 'Verification code sent', status: 200 });
  } catch (error) {
    res.send({ message: 'Failed to send verification code', status: 500 });
  }
};

module.exports = forgotPasswordRoute;
