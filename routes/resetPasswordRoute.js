const usersCollection = require('../models/users');

const resetPasswordRoute = async (req, res) => {
    const { username, email, verificationCode, newPassword } = req.body;
  
    const user = await usersCollection.findOne({ username, email });
  
    if (!user) {
      return res.send({ message: 'Invalid username or email', status: 400 });
    }
  
    if (user.resetPasswordToken !== verificationCode || user.resetPasswordExpires < Date.now()) {
      return res.send({ message: 'Invalid or expired verification code', status: 400 });
    }
  
    user.password = newPassword; // Hash the password before saving in a real application
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined; 
  
    await user.save();
  
    res.send({ message: 'Password reset successfully', status: 200 });
  };
  
  module.exports = resetPasswordRoute;
  