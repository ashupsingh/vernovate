import React from 'react';
import { motion } from 'framer-motion';
import Button from './ui/Button';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-white">
                {/* Animated Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                {/* Radial Gradient */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#FFB00010,transparent)]"></div>
            </div>

            <div className="container mx-auto px-4 z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-tight text-black">
                        Innovating <span className="text-gradient">Intelligent</span> <br />
                        Systems for a <span className="text-black">Smarter Future</span>
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                        Vernovate delivers enterprise-grade software, AI solutions, and IoT systems designed to scale your vision.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Button variant="primary" onClick={() => window.location.href = '/services'}>
                            Explore Services
                        </Button>
                        <Button variant="secondary" className="!text-black border-black/10 hover:bg-black/5" onClick={() => window.location.href = '/contact'}>
                            Contact Us
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
