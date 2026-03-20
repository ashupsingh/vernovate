import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, User, Briefcase, FolderGit2, Mail, LogIn, Shield, LogOut, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import logo from '../assets/logo.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, isAdmin } = useAuth();

    // Ref for detecting clicks outside the menu
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
            setIsOpen(false);
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

    const isHome = location.pathname === '/';

    const navLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'About', href: '/about', icon: User },
        { name: 'Services', href: '/services', icon: Briefcase },
        { name: 'Projects', href: '/projects', icon: FolderGit2 },
        { name: 'Contact', href: '/contact', icon: Mail },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Detect detail pages (e.g., /projects/xyz, /services/xyz) where the header should be hidden on desktop
    const isDetailPage = (/^\/projects\/.+/.test(location.pathname) || /^\/services\/.+/.test(location.pathname));

    // Auto-hide sidebar on mouse idle
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const idleTimerRef = useRef(null);

    useEffect(() => {
        const resetTimer = () => {
            setSidebarVisible(true);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
            idleTimerRef.current = setTimeout(() => setSidebarVisible(false), 3000);
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('mousedown', resetTimer);
        window.addEventListener('scroll', resetTimer);

        // Start the initial timer
        idleTimerRef.current = setTimeout(() => setSidebarVisible(false), 3000);

        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('mousedown', resetTimer);
            window.removeEventListener('scroll', resetTimer);
            if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        };
    }, []);

    return (
        <>
            {/* Desktop Vertical Sidebar */}
            <nav
                className={`hidden md:flex fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-6 transition-all duration-500 ${sidebarVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'}`}
                onMouseEnter={() => { setSidebarVisible(true); if (idleTimerRef.current) clearTimeout(idleTimerRef.current); }}
                onMouseLeave={() => { idleTimerRef.current = setTimeout(() => setSidebarVisible(false), 3000); }}
            >
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

                {/* Auth button in sidebar */}
                {user ? (
                    <>
                        <Link
                            to="/profile"
                            className={`group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isActive('/profile') ? 'bg-vernovate-primary text-black' : 'bg-white text-gray-500 hover:bg-vernovate-primary/20 hover:text-black'}`}
                        >
                            <UserCircle size={20} />
                            <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-md whitespace-nowrap pointer-events-none">
                                Profile
                            </span>
                        </Link>
                        {isAdmin && (
                            <Link
                                to="/admin"
                                className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg bg-vernovate-primary/90 text-black hover:bg-vernovate-primary"
                            >
                                <Shield size={20} />
                                <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-md whitespace-nowrap pointer-events-none">
                                    Admin Panel
                                </span>
                            </Link>
                        )}
                        <button
                            onClick={handleLogout}
                            className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg bg-white text-gray-500 hover:bg-red-50 hover:text-red-500"
                        >
                            <LogOut size={20} />
                            <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-md whitespace-nowrap pointer-events-none">
                                Logout
                            </span>
                        </button>
                    </>
                ) : (
                    <Link
                        to="/login"
                        className="group relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg bg-vernovate-primary text-black hover:bg-vernovate-accent"
                    >
                        <LogIn size={20} />
                        <span className="absolute right-14 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-md whitespace-nowrap pointer-events-none">
                            Login
                        </span>
                    </Link>
                )}
            </nav>

            {/* Top Header - Hidden entirely on detail pages, otherwise shows on all screens */}
            <header className={`absolute w-full z-40 top-0 left-0 py-2 pointer-events-none ${isDetailPage ? 'hidden' : ''}`}>
                <div className="container mx-auto px-4 md:px-8 flex justify-between items-center relative">
                    {/* Left: Hamburger on mobile, logo on desktop */}
                    <div className="flex items-center relative w-full">
                        {/* Hamburger - mobile only */}
                        <div className="md:hidden pointer-events-auto mr-2" ref={menuRef}>
                            <button
                                className="text-black focus:outline-none p-2 rounded-full hover:bg-white/50 transition-colors"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {isOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                        {/* Logo - desktop only */}
                        <Link to="/" className="hidden md:flex items-center space-x-2 pointer-events-auto">
                            <img src={logo} alt="Vernovate Logo" className="h-32 w-auto" />
                        </Link>
                        {/* VERNOVATE text - mobile only, top-right */}
                        <div className="md:hidden absolute right-4 top-1/2 -translate-y-1/2 font-extrabold text-xl tracking-tight text-black select-none">
                            <span className="text-black">VERNO</span><span className="text-vernovate-primary">VATE</span>
                        </div>
                        <AnimatePresence>
                            {isOpen && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="fixed inset-0 bg-black/30 z-40 pointer-events-auto"
                                        onClick={() => setIsOpen(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="fixed top-16 left-4 right-4 bg-white z-50 rounded-2xl shadow-xl border border-gray-100 overflow-hidden pointer-events-auto"
                                    >
                                        <div className="flex flex-col py-2">
                                            {navLinks.map((link) => (
                                                <Link
                                                    key={link.name}
                                                    to={link.href}
                                                    className={`px-5 py-3 text-sm font-medium flex items-center space-x-3 transition-colors ${isActive(link.href)
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
                                        {/* Auth links */}
                                        <div className="border-t border-gray-100 py-2">
                                            {user ? (
                                                <>
                                                    <Link
                                                        to="/profile"
                                                        className={`px-5 py-3 text-sm font-medium flex items-center space-x-3 transition-colors ${isActive('/profile')
                                                            ? 'bg-vernovate-primary/10 text-vernovate-primary border-l-4 border-vernovate-primary'
                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-black'
                                                            }`}
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <UserCircle size={16} />
                                                        <span>Profile</span>
                                                    </Link>
                                                    {isAdmin && (
                                                        <Link
                                                            to="/admin"
                                                            className="px-5 py-3 text-sm font-medium flex items-center space-x-3 text-vernovate-primary hover:bg-vernovate-primary/10 transition-colors"
                                                            onClick={() => setIsOpen(false)}
                                                        >
                                                            <Shield size={16} />
                                                            <span>Admin Panel</span>
                                                        </Link>
                                                    )}
                                                    <button
                                                        onClick={() => { handleLogout(); setIsOpen(false); }}
                                                        className="w-full px-5 py-3 text-sm font-medium flex items-center space-x-3 text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        <LogOut size={16} />
                                                        <span>Logout</span>
                                                    </button>
                                                </>
                                            ) : (
                                                <Link
                                                    to="/login"
                                                    className="px-5 py-3 text-sm font-medium flex items-center space-x-3 text-vernovate-primary hover:bg-vernovate-primary/10 transition-colors"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <LogIn size={16} />
                                                    <span>Login</span>
                                                </Link>
                                            )}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Navbar;
