import React, { useState } from 'react';
import Button from './ui/Button';
import Toast from './ui/Toast';
import { sendEmail } from '../lib/emailService';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { name, email, message } = formData;

        // Consolidate all info into the message body to ensure it appears in the email
        const fullMessage = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

        try {
            await sendEmail({
                from_name: name,
                from_email: email,
                reply_to: email,
                message: fullMessage,
                subject: `New Contact Message from ${name}`
            });

            setToast({
                show: true,
                message: "Message sent successfully!",
                type: 'success'
            });
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            setToast({
                show: true,
                message: "Failed to send message. Please try again.",
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative">
            {toast.show && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast({ ...toast, show: false })}
                />
            )}
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                        <input
                            required
                            disabled={isSubmitting}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            type="text"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-vernovate-primary focus:ring-1 focus:ring-vernovate-primary transition-all disabled:opacity-50"
                            placeholder="John Doe"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            required
                            disabled={isSubmitting}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-vernovate-primary focus:ring-1 focus:ring-vernovate-primary transition-all disabled:opacity-50"
                            placeholder="john@example.com"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                        required
                        disabled={isSubmitting}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-black focus:outline-none focus:border-vernovate-primary focus:ring-1 focus:ring-vernovate-primary transition-all disabled:opacity-50"
                        placeholder="Tell us about your project..."
                    ></textarea>
                </div>
                <Button variant="primary" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
            </form>
        </div>
    );
};

export default ContactForm;
