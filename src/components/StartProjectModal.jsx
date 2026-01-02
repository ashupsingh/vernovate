import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Toast from './ui/Toast';
import { sendEmail } from '../lib/emailService';

const StartProjectModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        projectType: 'Web Development',
        description: '',
        timeline: ''
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { name, email, projectType, description, timeline } = formData;

        // Include Name and Email in the message body
        const detailedMessage = `Name: ${name}\nEmail: ${email}\n\nProject Type: ${projectType}\nTimeline: ${timeline}\n\nDescription:\n${description}`;

        try {
            await sendEmail({
                from_name: name,
                from_email: email,
                reply_to: email,
                message: detailedMessage,
                subject: `New Project Inquiry: ${projectType} - ${name}`
            });

            setToast({
                show: true,
                message: "Project request received! We'll be in touch soon.",
                type: 'success'
            });

            setTimeout(() => {
                onClose();
                setToast({ ...toast, show: false });
            }, 3000);

        } catch (error) {
            setToast({
                show: true,
                message: "Failed to send request. Please try again.",
                type: 'error'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                    {toast.show && (
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToast({ ...toast, show: false })}
                        />
                    )}

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2 text-black">Start Your Project</h2>
                            <p className="text-gray-600 text-sm">Tell us a bit about what you want to build.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    required
                                    disabled={isSubmitting}
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    required
                                    disabled={isSubmitting}
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="john@example.com"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
                                <select
                                    disabled={isSubmitting}
                                    name="projectType"
                                    value={formData.projectType}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                >
                                    <option>Web Development</option>
                                    <option>App Development</option>
                                    <option>AI & Machine Learning</option>
                                    <option>IoT Solution</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                                <textarea
                                    required
                                    disabled={isSubmitting}
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="Briefly describe your idea..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Timeline</label>
                                <input
                                    disabled={isSubmitting}
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="e.g. 1-2 months"
                                />
                            </div>

                            <Button variant="primary" className="w-full justify-center mt-6 group" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="flex items-center">Sending...</span>
                                ) : (
                                    <>
                                        <Send size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                                        Send Request
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default StartProjectModal;
