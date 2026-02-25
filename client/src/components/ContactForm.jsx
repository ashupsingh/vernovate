import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Button from './ui/Button';
import Toast from './ui/Toast';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

const ContactForm = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        message: ''
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { name, email, message } = formData;

        try {
            // Save to database and send email notifications via server
            await api.post('/contact', {
                name,
                email,
                subject: `Contact from ${name}`,
                message,
                type: 'contact',
            });

            setToast({
                show: true,
                message: "Message sent successfully!",
                type: 'success'
            });
            setFormData({ name: user?.name || '', email: user?.email || '', message: '' });

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
            {!user ? (
                <div className="max-w-lg mx-auto text-center py-12">
                    <div className="w-16 h-16 bg-vernovate-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <LogIn size={28} className="text-vernovate-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2">Login Required</h3>
                    <p className="text-gray-500 mb-6">Please log in or sign up to send us a message.</p>
                    <div className="flex items-center justify-center gap-3">
                        <Link to="/login" className="bg-vernovate-primary text-black font-bold py-2.5 px-6 rounded-xl hover:bg-vernovate-accent transition-all shadow-lg shadow-vernovate-primary/25">
                            Login
                        </Link>
                        <Link to="/signup" className="bg-white text-black font-bold py-2.5 px-6 rounded-xl border border-gray-200 hover:border-vernovate-primary transition-all">
                            Sign Up
                        </Link>
                    </div>
                </div>
            ) : (
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Name</label>
                        <input
                            required
                            disabled
                            readOnly
                            name="name"
                            value={formData.name}
                            type="text"
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-600 cursor-not-allowed"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                        <input
                            required
                            disabled
                            readOnly
                            name="email"
                            value={formData.email}
                            type="email"
                            className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-3 text-gray-600 cursor-not-allowed"
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
            )}
        </div>
    );
};

export default ContactForm;
