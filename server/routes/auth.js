import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import { generateOTP, sendOTPEmail } from '../services/emailService.js';
import auth from '../middleware/auth.js';
import { cloudinary, upload } from '../config/cloudinary.js';

const router = express.Router();

// Helper: create JWT (1 hour session)
const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// ──────────────────────────────────────
// POST /api/auth/signup
// ──────────────────────────────────────
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        // Strong password validation
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
            return res.status(400).json({
                message: 'Password must include uppercase, lowercase, number, and special character'
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.isVerified) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        // If unverified user exists, update their info
        let user;
        if (existingUser && !existingUser.isVerified) {
            existingUser.name = name;
            existingUser.password = password;
            await existingUser.save();
            user = existingUser;
        } else {
            // Check if this is the super admin email
            const role = email === process.env.SUPER_ADMIN_EMAIL ? 'superadmin' : 'user';
            user = await User.create({ name, email, password, role });
        }

        // Generate and send OTP
        await OTP.deleteMany({ email, type: 'signup' });
        const otp = generateOTP();
        await OTP.create({ email, code: otp, type: 'signup' });
        await sendOTPEmail(email, otp, 'signup');

        res.status(201).json({
            message: 'Account created. Please verify your email.',
            email,
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error during signup' });
    }
});

// ──────────────────────────────────────
// POST /api/auth/verify-otp
// ──────────────────────────────────────
router.post('/verify-otp', async (req, res) => {
    try {
        const { email, code, type } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: 'Email and OTP code are required' });
        }

        const otpRecord = await OTP.findOne({
            email,
            code,
            type: type || 'signup',
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        if (type === 'signup' || !type) {
            await User.findOneAndUpdate({ email }, { isVerified: true });
        }

        // Clean up used OTPs
        await OTP.deleteMany({ email, type: type || 'signup' });

        // Return token for signup verification
        if (type === 'signup' || !type) {
            const user = await User.findOne({ email });
            const token = createToken(user._id);
            return res.json({
                message: 'Email verified successfully',
                token,
                user,
            });
        }

        res.json({ message: 'OTP verified successfully' });
    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({ message: 'Server error during verification' });
    }
});

// ──────────────────────────────────────
// POST /api/auth/login
// ──────────────────────────────────────
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        if (!user.isVerified) {
            // Resend signup OTP
            await OTP.deleteMany({ email, type: 'signup' });
            const otp = generateOTP();
            await OTP.create({ email, code: otp, type: 'signup' });
            await sendOTPEmail(email, otp, 'signup');
            return res.status(403).json({
                message: 'Email not verified. A new verification code has been sent.',
                requiresVerification: true,
                email,
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Direct login — return JWT immediately
        const token = createToken(user._id);
        const userObj = user.toObject();
        delete userObj.password;

        res.json({
            message: 'Login successful',
            token,
            user: userObj,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error during login' });
    }
});

// ──────────────────────────────────────
// POST /api/auth/verify-login
// ──────────────────────────────────────
router.post('/verify-login', async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: 'Email and OTP code are required' });
        }

        const otpRecord = await OTP.findOne({
            email,
            code,
            type: 'login',
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        await OTP.deleteMany({ email, type: 'login' });

        const user = await User.findOne({ email });
        const token = createToken(user._id);

        res.json({
            message: 'Login successful',
            token,
            user,
        });
    } catch (error) {
        console.error('Verify login error:', error);
        res.status(500).json({ message: 'Server error during login verification' });
    }
});

// ──────────────────────────────────────
// POST /api/auth/forgot-password
// ──────────────────────────────────────
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if user exists
            return res.json({ message: 'If an account exists, a reset code has been sent.' });
        }

        await OTP.deleteMany({ email, type: 'reset' });
        const otp = generateOTP();
        await OTP.create({ email, code: otp, type: 'reset' });
        await sendOTPEmail(email, otp, 'reset');

        res.json({ message: 'If an account exists, a reset code has been sent.', email });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// POST /api/auth/verify-reset-otp
// ──────────────────────────────────────
router.post('/verify-reset-otp', async (req, res) => {
    try {
        const { email, code } = req.body;

        if (!email || !code) {
            return res.status(400).json({ message: 'Email and OTP code are required' });
        }

        const otpRecord = await OTP.findOne({
            email,
            code,
            type: 'reset',
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Don't delete the OTP yet — it will be consumed when the password is actually reset
        res.json({ message: 'OTP verified successfully', verified: true });
    } catch (error) {
        console.error('Verify reset OTP error:', error);
        res.status(500).json({ message: 'Server error during verification' });
    }
});

// ──────────────────────────────────────
// POST /api/auth/reset-password
// ──────────────────────────────────────
router.post('/reset-password', async (req, res) => {
    try {
        const { email, code, newPassword } = req.body;

        if (!email || !code || !newPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }

        // Strong password validation
        const hasUppercase = /[A-Z]/.test(newPassword);
        const hasLowercase = /[a-z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
            return res.status(400).json({
                message: 'Password must include uppercase, lowercase, number, and special character'
            });
        }

        const otpRecord = await OTP.findOne({
            email,
            code,
            type: 'reset',
            expiresAt: { $gt: new Date() }
        });

        if (!otpRecord) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        user.password = newPassword;
        await user.save();

        await OTP.deleteMany({ email, type: 'reset' });

        res.json({ message: 'Password reset successfully. You can now login.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Server error during password reset' });
    }
});

// ──────────────────────────────────────
// POST /api/auth/resend-otp
// ──────────────────────────────────────
router.post('/resend-otp', async (req, res) => {
    try {
        const { email, type } = req.body;

        if (!email || !type) {
            return res.status(400).json({ message: 'Email and type are required' });
        }

        await OTP.deleteMany({ email, type });
        const otp = generateOTP();
        await OTP.create({ email, code: otp, type });
        await sendOTPEmail(email, otp, type);

        res.json({ message: 'A new verification code has been sent.' });
    } catch (error) {
        console.error('Resend OTP error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// GET /api/auth/me (Protected)
// ──────────────────────────────────────
router.get('/me', auth, async (req, res) => {
    try {
        res.json({ user: req.user });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// PATCH /api/auth/profile (Protected)
// ──────────────────────────────────────
router.patch('/profile', auth, async (req, res) => {
    try {
        const { name, phone, bio, dateOfBirth, gender, location } = req.body;

        if (!name || name.trim().length < 2) {
            return res.status(400).json({ message: 'Name must be at least 2 characters' });
        }

        const user = await User.findById(req.user._id);
        user.name = name.trim();
        if (phone !== undefined) user.phone = phone.trim();
        if (bio !== undefined) user.bio = bio.trim();
        if (dateOfBirth !== undefined) user.dateOfBirth = dateOfBirth || null;
        if (gender !== undefined) user.gender = gender;
        if (location !== undefined) user.location = location.trim();
        await user.save();

        res.json({ message: 'Profile updated', user });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// PUT /api/auth/change-password (Protected)
// ──────────────────────────────────────
router.put('/change-password', auth, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const user = await User.findById(req.user._id).select('+password');
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Strong password validation
        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters' });
        }
        const hasUppercase = /[A-Z]/.test(newPassword);
        const hasLowercase = /[a-z]/.test(newPassword);
        const hasNumber = /[0-9]/.test(newPassword);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword);

        if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecial) {
            return res.status(400).json({
                message: 'Password must include uppercase, lowercase, number, and special character'
            });
        }

        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// POST /api/auth/avatar (Protected)
// ──────────────────────────────────────
router.post('/avatar', auth, upload.single('avatar'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await User.findById(req.user._id);

        // Delete old avatar from Cloudinary if exists
        if (user.avatar) {
            const parts = user.avatar.split('/');
            const folderAndFile = parts.slice(parts.indexOf('vernovate')).join('/');
            const publicId = folderAndFile.replace(/\.[^/.]+$/, '');
            await cloudinary.uploader.destroy(publicId).catch(() => {});
        }

        user.avatar = req.file.path;
        await user.save();

        res.json({ message: 'Avatar updated', user });
    } catch (error) {
        console.error('Avatar upload error:', error);
        res.status(500).json({ message: 'Failed to upload avatar' });
    }
});

// ──────────────────────────────────────
// DELETE /api/auth/avatar (Protected)
// ──────────────────────────────────────
router.delete('/avatar', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user.avatar) {
            const parts = user.avatar.split('/');
            const folderAndFile = parts.slice(parts.indexOf('vernovate')).join('/');
            const publicId = folderAndFile.replace(/\.[^/.]+$/, '');
            await cloudinary.uploader.destroy(publicId).catch(() => {});
        }

        user.avatar = '';
        await user.save();

        res.json({ message: 'Avatar removed', user });
    } catch (error) {
        console.error('Avatar remove error:', error);
        res.status(500).json({ message: 'Failed to remove avatar' });
    }
});

export default router;
