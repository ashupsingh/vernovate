import React from 'react';
import { motion } from 'framer-motion';

const PageLoader = () => {
    return (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
            {/* Subtle grid background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]" />

            <div className="relative flex flex-col items-center gap-8">
                {/* Logo text animation */}
                <div className="flex items-center">
                    {'VERNOVATE'.split('').map((letter, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: i * 0.08,
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`text-4xl md:text-5xl font-extrabold tracking-tight select-none ${i >= 5 ? 'text-vernovate-primary' : 'text-gray-900'
                                }`}
                        >
                            {letter}
                        </motion.span>
                    ))}
                </div>

                {/* Animated progress bar */}
                <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-vernovate-primary to-vernovate-accent rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{
                            duration: 1.2,
                            ease: [0.22, 1, 0.36, 1],
                            repeat: Infinity,
                            repeatType: 'loop',
                            repeatDelay: 0.3,
                        }}
                    />
                </div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-sm text-gray-400 tracking-widest uppercase"
                >
                    Innovating the Future
                </motion.p>
            </div>
        </div>
    );
};

export default PageLoader;
