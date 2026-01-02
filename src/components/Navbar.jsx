import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, Briefcase, FolderGit2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Ref for detecting clicks outside the menu
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle click outside to close menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'About', href: '/about', icon: User },
        { name: 'Services', href: '/services', icon: Briefcase },
        { name: 'Projects', href: '/projects', icon: FolderGit2 },
        { name: 'Contact', href: '/contact', icon: Mail },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Desktop Vertical Sidebar - Unchanged */}
            <nav className="hidden md:flex fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-6">
                {navLinks.map((link) => {
                    const active = isActive(link.href);
                    return (
                        <Link
                            key={link.name}
                            to={link.href}
                            className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${active ? 'bg-vernovate-primary text-black' : 'bg-white text-gray-500 hover:bg-vernovate-primary/20 hover:text-black'}`}
                        >
                            <link.icon size={20} />
                            <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-md whitespace-nowrap pointer-events-none">
                                {link.name}
                            </span>
                        </Link>
                    )
                })}
            </nav>

            {/* Top Header */}
            <header className="absolute w-full z-40 top-0 left-0 py-6 pointer-events-none">
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center relative">
                    <div className="pointer-events-auto">
                        <Link to="/" className="flex items-center space-x-2">
                            {location.pathname === '/' && (
                                <img src={logo} alt="Vernovate Logo" className="h-32 w-auto" />
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Container - Wrapped for positioning relative to button */}
                    <div className="md:hidden pointer-events-auto relative" ref={menuRef}>
                        <button
                            className="text-black focus:outline-none p-2 rounded-full hover:bg-white/50 transition-colors"
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>

                        {/* Chrome-style Popover Menu */}
                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    transition={{ duration: 0.2, ease: "easeOut" }}
                                    className="absolute right-0 top-14 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 origin-top-right z-50"
                                >
                                    <div className="flex flex-col">
                                        {navLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                to={link.href}
                                                className={`px-4 py-3 text-sm font-medium flex items-center space-x-3 transition-colors ${isActive(link.href)
                                                        ? 'bg-vernovate-primary/10 text-vernovate-primary border-l-4 border-vernovate-primary'
                                                        : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                                                    }`}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <link.icon size={16} />
                                                <span>{link.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
