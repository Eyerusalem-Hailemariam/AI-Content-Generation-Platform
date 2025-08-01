//services.signup.services
require('dotenv').config(); 
const User = require('../models/User')
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

async function checkIfUserExists(email) {
    try {
        const user = await User.findOne({ email });
        return !!user;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}

async function getUser(id) {
    try {
        console.log("hey")
        const user = await User.findById(id).select('-passwordHash');

        console.log("user", user)
        return user;
    } catch (error) {
        console.error('Error checking if user exists:', error);
        throw error;
    }
}

async function signup(user) {
    try {
        name = user.name,
        email = user.email
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(user.password, salt);

    const newUser = new User({
       name, 
        email,
        passwordHash,
        credits: 10.
    });

    await newUser.save();
    return newUser
}
catch(error) {
    console.log(error)
}
}

async function sendResetEmail(email) {
    try {
        const user = await User.findOne({email});

        if(!user) {
            throw new Error('User not Found');
        }

        const otp = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

        user.resetOTP = otp;
        user.resetOTPExpires = otpExpires;

        await user.save();


        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: `"AI Content Generation Platform" <${process.env.EMAIL_USER}>`,
            to : email,
            subject : 'Password Reset OTP',
            text : `Your password reset OTP is ${otp}.It will expire in 10 minutes.`
        };

        await transporter.sendMail(mailOptions);
        return {
            success: true,
            message: 'OTP sent successfully to your email address.',
          };
    } catch(err) {
        console.error('Error sending reset email:', err);
        throw err;
    }
}

async function verifyOtpAndChangePassword({ email, otp, newPassword }) {
    console.log("email, otp, newPassword", email, otp, newPassword);
    try {
      const user = await User.findOne({ email });

      console.log('User fetched from DB:', user);

      if (!user) {
        throw new Error('User not found');
      }
  
      if (!otp || !user.resetOTP || user.resetOTP.trim() !== otp.trim()) {
        throw new Error('Invalid OTP');
      }
  
      if (!user.resetOTPExpires || user.resetOTPExpires < new Date()) {
        throw new Error('OTP has expired');
      }
      console.log('Comparing:', otp.trim(), user.resetOTP?.trim());
      console.log({
        email,
        otpFromClient: otp,
        otpInDb: user.resetOTP,
        otpExpiresAt: user.resetOTPExpires,
        now: new Date(),
      });
      
      const salt = await bcrypt.genSalt(10);
      user.passwordHash = await bcrypt.hash(newPassword, salt);
  
      user.resetOTP = undefined;
      user.resetOTPExpires = undefined;
  
      await user.save();
  
      return { success: true, message: 'Password changed successfully' };
    } catch (err) {
      console.error('Error verifying OTP and changing password:', err);
      throw err;
    }
  }
  
module.exports = {
    checkIfUserExists,
    signup,
    getUser,
    sendResetEmail,
    verifyOtpAndChangePassword
};
