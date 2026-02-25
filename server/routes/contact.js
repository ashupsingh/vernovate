import express from 'express';
import Contact from '../models/Contact.js';
import { sendConfirmationEmail, sendAdminNotificationEmail } from '../services/emailService.js';

const router = express.Router();

// ──────────────────────────────────────
// POST /api/contact
// ──────────────────────────────────────
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message, type } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ message: 'Name, email, and message are required' });
        }

        const contact = await Contact.create({ name, email, subject, message, type: type || 'contact' });

        // Send confirmation email to user (non-blocking)
        sendConfirmationEmail(email, name, type || 'contact').catch(err => {
            console.warn('Confirmation email failed:', err.message);
        });

        // Send notification email to admin (non-blocking)
        sendAdminNotificationEmail({ name, email, subject, message, type: type || 'contact' }).catch(err => {
            console.warn('Admin notification email failed:', err.message);
        });

        res.status(201).json({
            message: 'Thank you for reaching out! We will get back to you shortly.',
            contact
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
