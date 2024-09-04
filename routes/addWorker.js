const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const User = require("../models/users"); // Import User model correctly

const generateRandomPassword = (length) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};

const sendEmail = async (username, name, email, password) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Ensure this matches your email service provider 
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: "EAST CANTONMENT PHARMACY: Your new account password",
    text: `Hi ${name}, Your username is ${username} and your password is: ${password}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error); // Log the error for debugging
    throw new Error("Failed to send email");
  }
};

const addWorker = async (req, res) => {
  const { name, username, email } = req.body;

  try {
    // Check if username or email already exists
    const isUserNameExists = await User.findOne({ username });
    if (isUserNameExists) {
      return res.status(409).json({ message: "Username already exists!" });
    }

    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
      return res.status(409).json({ message: "Email already exists!" });
    }

    // Generate and hash password
    const generatedPassword = generateRandomPassword(12);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    // Create and save the new user
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();

    // Send email with the new password
    try {
      await sendEmail(username, name, email, generatedPassword);
      res.status(200).json({ message: "User created successfully! Password sent to email." });
    } catch (emailError) {
      res.status(500).json({ message: "User created, but failed to send email." });
    }
  } catch (error) {
    console.error("Failed to create user:", error); // Log the error for debugging
    res.status(500).json({ message: "Failed to create user." });
  }
};

module.exports = addWorker;
