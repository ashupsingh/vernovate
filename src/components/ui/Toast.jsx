import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 5000 }) => {
    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    const variants = {
        initial: { opacity: 0, y: 50, scale: 0.9 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 20, scale: 0.95 }
    };

    const bgColor = type === 'success' ? 'bg-black' : 'bg-red-500';
    const icon = type === 'success' ? <CheckCircle className="text-vernovate-primary" size={20} /> : <XCircle className="text-white" size={20} />;

    return (
        <AnimatePresence>
            <motion.div
                layout
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variants}
                className={`fixed bottom-8 right-4 md:right-8 z-[100] flex items-center p-4 rounded-xl shadow-2xl ${bgColor} text-white min-w-[300px] border border-gray-800`}
            >
                <div className="mr-3">
                    {icon}
                </div>
                <div className="flex-1 mr-4">
                    <p className="font-medium text-sm">{message}</p>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                    <X size={16} />
                </button>
            </motion.div>
        </AnimatePresence>
    );
};

export default Toast;
