import React, { useState, useEffect } from 'react';
import { X, Send, Link2 as LinkIcon, Linkedin, Github, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from './ui/Button';
import Toast from './ui/Toast';
import api from '../lib/api';
import { useAuth } from '../context/AuthContext';

const ApplicationModal = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        user_name: user?.name || '',
        user_email: user?.email || '',
        position: 'Software Developer',
        other_role: '',
        resume_link: '',
        linkedin: '',
        github: ''
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prev => ({ ...prev, user_name: user.name, user_email: user.email }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const displayPosition = formData.position === 'Other'
        ? `Other (${formData.other_role})`
        : formData.position;

    const detailedMessage = `Position: ${displayPosition}\n\nResume: ${formData.resume_link}\nLinkedIn: ${formData.linkedin}\nGitHub: ${formData.github}`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Save to database and send email notifications via server
            await api.post('/contact', {
                name: formData.user_name,
                email: formData.user_email,
                subject: `Job Application: ${displayPosition}`,
                message: detailedMessage,
                type: 'application',
            });

            setToast({
                show: true,
                message: "Application sent successfully!",
                type: 'success'
            });

            setTimeout(() => {
                onClose();
                setToast({ ...toast, show: false });
                setFormData({
                    user_name: user?.name || '',
                    user_email: user?.email || '',
                    position: 'Software Developer',
                    other_role: '',
                    resume_link: '',
                    linkedin: '',
                    github: ''
                });
            }, 3000);

        } catch (error) {
            console.error(error);
            setToast({
                show: true,
                message: "Failed to submit application. Please try again.",
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
                        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold mb-2 text-black">Join Our Team</h2>
                            <p className="text-gray-600 text-sm">Submit your links and we'll be in touch.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!user ? (
                                <div className="text-center py-8">
                                    <div className="w-14 h-14 bg-vernovate-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                        <LogIn size={24} className="text-vernovate-primary" />
                                    </div>
                                    <h3 className="text-lg font-bold text-black mb-2">Login Required</h3>
                                    <p className="text-gray-500 text-sm mb-6">Please log in or sign up to submit your application.</p>
                                    <div className="flex items-center justify-center gap-3">
                                        <Link to="/login" onClick={onClose} className="bg-vernovate-primary text-black font-bold py-2.5 px-6 rounded-xl hover:bg-vernovate-accent transition-all shadow-lg shadow-vernovate-primary/25">
                                            Login
                                        </Link>
                                        <Link to="/signup" onClick={onClose} className="bg-white text-black font-bold py-2.5 px-6 rounded-xl border border-gray-200 hover:border-vernovate-primary transition-all">
                                            Sign Up
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                            <>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    required
                                    disabled
                                    readOnly
                                    name="user_name"
                                    value={formData.user_name}
                                    type="text"
                                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-600 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    required
                                    disabled
                                    readOnly
                                    name="user_email"
                                    value={formData.user_email}
                                    type="email"
                                    className="w-full bg-gray-100 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-600 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Position of Interest</label>
                                <select
                                    disabled={isSubmitting}
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                >
                                    <option>Software Developer</option>
                                    <option>Frontend Engineer</option>
                                    <option>Backend Engineer</option>
                                    <option>UI/UX Designer</option>
                                    <option>Project Manager</option>
                                    <option>Internship</option>
                                    <option>Other</option>
                                </select>
                            </div>

                            {/* Conditional "Other" Role Input */}
                            <AnimatePresence>
                                {formData.position === 'Other' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Specify Role</label>
                                            <input
                                                required={formData.position === 'Other'}
                                                disabled={isSubmitting}
                                                name="other_role"
                                                value={formData.other_role}
                                                onChange={handleChange}
                                                type="text"
                                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                                placeholder="e.g. Data Scientist"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Resume Link */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <LinkIcon size={14} className="mr-1" /> Resume/CV (Google Drive Link)
                                </label>
                                <input
                                    required
                                    disabled={isSubmitting}
                                    name="resume_link"
                                    value={formData.resume_link}
                                    onChange={handleChange}
                                    type="url"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="https://drive.google.com/..."
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Please ensure the link is <strong>Public</strong> (Anyone with the link can view).
                                </p>
                            </div>

                            {/* LinkedIn Link */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <Linkedin size={14} className="mr-1" /> LinkedIn Profile
                                </label>
                                <input
                                    required
                                    disabled={isSubmitting}
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    type="url"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>

                            {/* GitHub Link */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    <Github size={14} className="mr-1" /> GitHub Profile
                                </label>
                                <input
                                    disabled={isSubmitting} // Github optional? User said "along with github". I'll make it required if position is technical, but for now optional/required logic is complex. I'll make it text input so empty is fine, or simple url.
                                    // I'll make it REQUIRED as per tone of "along with github".
                                    required
                                    name="github"
                                    value={formData.github}
                                    onChange={handleChange}
                                    type="url"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="https://github.com/..."
                                />
                            </div>

                            <Button variant="primary" className="w-full justify-center mt-6 group" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <span className="flex items-center">Sending...</span>
                                ) : (
                                    <>
                                        <Send size={18} className="mr-2 group-hover:translate-x-1 transition-transform" />
                                        Submit Application
                                    </>
                                )}
                            </Button>
                            </>
                            )}
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ApplicationModal;
