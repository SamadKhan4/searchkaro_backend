const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Configure email transporter
const configureTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Generate random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Store OTPs in memory (in production, use Redis or database)
const otpStore = new Map();

// Signup controller
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user to database
    const savedUser = await user.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response
    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Send response
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Forgot Password - Step 1: Send OTP
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = generateOTP();
    
    // Store OTP with expiration (5 minutes)
    const expiry = Date.now() + 5 * 60 * 1000; // 5 minutes
    otpStore.set(email, { otp, expiry });

    // Configure email transporter
    const transporter = configureTransporter();

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Password Reset OTP - SearchKaro',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p>Hello,</p>
          <p>You have requested to reset your password. Please use the following OTP to proceed:</p>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; color: #333; margin: 20px 0;">
            ${otp}
          </div>
          <p>This OTP is valid for 5 minutes. If you didn't request this, please ignore this email.</p>
          <p>Best regards,<br>SearchKaro Team</p>
        </div>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: `OTP sent successfully to ${email}` 
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    // Clear OTP on error
    otpStore.delete(req.body.email);
    res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
};

// Forgot Password - Step 2: Verify OTP
exports.verifyOtp = (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if OTP exists for this email
    const storedOtp = otpStore.get(email);
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    // Check if OTP is expired
    if (Date.now() > storedOtp.expiry) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Check if OTP matches
    if (storedOtp.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

// Forgot Password - Step 3: Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    // Check if OTP exists for this email
    const storedOtp = otpStore.get(email);
    if (!storedOtp) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    // Check if OTP is expired
    if (Date.now() > storedOtp.expiry) {
      otpStore.delete(email);
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Check if OTP matches
    if (storedOtp.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Delete OTP after successful reset
    otpStore.delete(email);

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Failed to reset password' });
  }
};