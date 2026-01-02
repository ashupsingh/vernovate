import React, { useState, useRef } from 'react';
import { X, Send, Upload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './ui/Button';
import Toast from './ui/Toast';
import { sendFormEmail } from '../lib/emailService';

const ApplicationModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        position: 'Software Developer',
        resumeName: ''
    });
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formRef = useRef();
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Client-side validation: Allow up to 2MB as requested
            if (file.size > 2 * 1024 * 1024) {
                setToast({
                    show: true,
                    message: "File is too large. Max size is 2MB.",
                    type: 'error'
                });
                // Clear the input
                e.target.value = "";
                setFormData({ ...formData, resumeName: '' });
                return;
            }

            setFormData({ ...formData, resumeName: file.name });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await sendFormEmail(formRef.current);

            setToast({
                show: true,
                message: "Application & Resume sent successfully!",
                type: 'success'
            });

            setTimeout(() => {
                onClose();
                setToast({ ...toast, show: false });
            }, 3000);

        } catch (error) {
            console.error(error);

            // Specific error handling for file size limits
            if (error?.status === 413 || (error?.text && error.text.includes('size limit'))) {
                setToast({
                    show: true,
                    message: "File too large for server (Limit is often 50KB). Please use a smaller file.",
                    type: 'error'
                });
            } else {
                setToast({
                    show: true,
                    message: "Failed to submit application. Please try again.",
                    type: 'error'
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const triggerFileUpload = () => {
        fileInputRef.current.click();
    };

    const detailedMessage = `Name: ${formData.user_name}
Email: ${formData.user_email}
Position: ${formData.position}

(See attachment for Resume)`;

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
                            <h2 className="text-2xl font-bold mb-2 text-black">Join Our Team</h2>
                            <p className="text-gray-600 text-sm">Send us your details and we'll be in touch.</p>
                        </div>

                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                            <input type="hidden" name="from_name" value={formData.user_name} />
                            <input type="hidden" name="from_email" value={formData.user_email} />
                            <input type="hidden" name="reply_to" value={formData.user_email} />
                            <input type="hidden" name="subject" value={`Job Application: ${formData.position} - ${formData.user_name}`} />
                            <textarea name="message" value={detailedMessage} className="hidden" readOnly />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    required
                                    disabled={isSubmitting}
                                    name="user_name"
                                    value={formData.user_name}
                                    onChange={handleChange}
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="Jane Doe"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <input
                                    required
                                    disabled={isSubmitting}
                                    name="user_email"
                                    value={formData.user_email}
                                    onChange={handleChange}
                                    type="email"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-black focus:ring-2 focus:ring-vernovate-primary/50 focus:border-vernovate-primary outline-none transition-all disabled:opacity-50"
                                    placeholder="jane@example.com"
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

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Resume/CV</label>
                                <div
                                    onClick={!isSubmitting ? triggerFileUpload : undefined}
                                    className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-vernovate-primary hover:bg-gray-50 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <input
                                        type="file"
                                        name="my_file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                        disabled={isSubmitting}
                                    />
                                    <Upload className="mx-auto text-gray-400 mb-2" size={24} />
                                    <p className="text-sm text-gray-600">
                                        {formData.resumeName ? (
                                            <span className="text-vernovate-primary font-semibold">{formData.resumeName}</span>
                                        ) : (
                                            "Click to upload or drag and drop"
                                        )}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">PDF, DOC up to 5MB</p>
                                </div>
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
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ApplicationModal;
