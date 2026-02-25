import express from 'express';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import auth from '../middleware/auth.js';
import roleCheck from '../middleware/roleCheck.js';
import { sendReplyEmail } from '../services/emailService.js';

const router = express.Router();

// All admin routes require auth + admin/superadmin role
router.use(auth);
router.use(roleCheck('admin', 'superadmin'));

// ──────────────────────────────────────
// GET /api/admin/stats
// ──────────────────────────────────────
router.get('/stats', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const verifiedUsers = await User.countDocuments({ isVerified: true });
        const adminUsers = await User.countDocuments({ role: { $in: ['admin', 'superadmin'] } });
        const totalContacts = await Contact.countDocuments();
        const unreadContacts = await Contact.countDocuments({ isRead: false });

        // Recent signups (last 7 days)
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const recentSignups = await User.countDocuments({ createdAt: { $gte: weekAgo } });

        // Signups per day (last 30 days)
        const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const signupsByDay = await User.aggregate([
            { $match: { createdAt: { $gte: monthAgo } } },
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
                    count: { $sum: 1 },
                },
            },
            { $sort: { _id: 1 } },
        ]);

        res.json({
            totalUsers,
            verifiedUsers,
            adminUsers,
            totalContacts,
            unreadContacts,
            recentSignups,
            signupsByDay,
        });
    } catch (error) {
        console.error('Stats error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// GET /api/admin/users
// ──────────────────────────────────────
router.get('/users', async (req, res) => {
    try {
        const { search, role, page = 1, limit = 20 } = req.query;

        const query = {};
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } },
            ];
        }
        if (role) query.role = role;

        const total = await User.countDocuments(query);
        const users = await User.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            users,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('Users list error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// PATCH /api/admin/users/:id/role (SuperAdmin only)
// ──────────────────────────────────────
router.patch('/users/:id/role', roleCheck('superadmin'), async (req, res) => {
    try {
        const { role } = req.body;

        if (!['user', 'admin', 'superadmin'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent changing own role
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot change your own role' });
        }

        user.role = role;
        await user.save();

        res.json({ message: 'User role updated', user });
    } catch (error) {
        console.error('Role change error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// DELETE /api/admin/users/:id (SuperAdmin only)
// ──────────────────────────────────────
router.delete('/users/:id', roleCheck('superadmin'), async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Prevent deleting self
        if (user._id.toString() === req.user._id.toString()) {
            return res.status(400).json({ message: 'Cannot delete your own account' });
        }

        // Prevent deleting other superadmins
        if (user.role === 'superadmin') {
            return res.status(400).json({ message: 'Cannot delete a super admin account' });
        }

        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// GET /api/admin/contacts
// ──────────────────────────────────────
router.get('/contacts', async (req, res) => {
    try {
        const { page = 1, limit = 50 } = req.query;

        const total = await Contact.countDocuments();
        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(Number(limit));

        res.json({
            contacts,
            total,
            page: Number(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error('Contacts list error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// PATCH /api/admin/contacts/:id/read
// ──────────────────────────────────────
router.patch('/contacts/:id/read', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { isRead: true },
            { new: true }
        );
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Marked as read', contact });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// DELETE /api/admin/contacts/:id
// ──────────────────────────────────────
router.delete('/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.json({ message: 'Message deleted' });
    } catch (error) {
        console.error('Delete contact error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// ──────────────────────────────────────
// POST /api/admin/contacts/:id/reply
// ──────────────────────────────────────
router.post('/contacts/:id/reply', async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({ message: 'Reply message is required' });
        }

        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        // Send reply email with Vernovate template
        await sendReplyEmail(
            contact.email,
            contact.name,
            message.trim(),
            contact.subject
        );

        // Save reply and mark as read
        contact.replies.push({
            message: message.trim(),
            repliedBy: req.user?.name || 'Admin',
            repliedAt: new Date(),
        });
        contact.isRead = true;
        await contact.save();

        res.json({ message: 'Reply sent successfully' });
    } catch (error) {
        console.error('Reply error:', error);
        res.status(500).json({ message: 'Failed to send reply. Please try again.' });
    }
});

export default router;
