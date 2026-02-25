import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Users, Mail, Settings, LogOut, Menu, X, ChevronRight, ArrowLeft, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const sidebarLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/users', icon: Users },
    { name: 'Messages', href: '/admin/messages', icon: Mail },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
];

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [isExpanded, setIsExpanded] = useState(true);

    const isActive = (href) => {
        if (href === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(href);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex text-gray-900 relative z-[1]">
            {/* Global continuous grid background for admin pages */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="w-full h-full bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            </div>

            {/* Mobile overlay */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 flex flex-col transition-all duration-300 overflow-x-hidden ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0'
                    } ${isExpanded ? 'md:w-64' : 'md:w-[72px]'}`}
            >
                {/* Logo & Toggle */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between h-[73px] shrink-0">
                    <Link to="/admin" className={`block overflow-hidden transition-all duration-300 ${isExpanded ? 'w-auto opacity-100 flex-1' : 'w-0 opacity-0'}`}>
                        <h1 className="text-xl font-extrabold tracking-tighter whitespace-nowrap">
                            <span className="text-gray-900">VERNO</span>
                            <span className="text-vernovate-primary">VATE</span>
                        </h1>
                    </Link>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`hidden md:flex p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 shrink-0 transition-all ${isExpanded ? '' : 'mx-auto'}`}
                        title={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
                    >
                        {isExpanded ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                    </button>
                    {/* Mobile close button */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-50 shrink-0"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    {sidebarLinks.map((link) => {
                        const active = isActive(link.href);
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                onClick={() => setSidebarOpen(false)}
                                title={!isExpanded ? link.name : ""}
                                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group ${active
                                    ? 'bg-vernovate-primary/10 text-vernovate-primary border border-vernovate-primary/20'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <div className="flex items-center justify-center min-w-[20px]">
                                    <link.icon size={18} />
                                </div>
                                <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 hidden md:block md:w-0'}`}>{link.name}</span>
                                {active && isExpanded && <ChevronRight size={14} className="ml-auto flex-shrink-0" />}

                                {/* Tooltip for collapsed state */}
                                {!isExpanded && (
                                    <div className="absolute left-full ml-3 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 md:block hidden shadow-lg">
                                        {link.name}
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Bottom actions */}
                <div className="p-3 border-t border-gray-100 space-y-1">
                    <Link
                        to="/"
                        title={!isExpanded ? "Back to Site" : ""}
                        className="flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all relative group"
                    >
                        <div className="flex items-center justify-center min-w-[20px]">
                            <ArrowLeft size={18} />
                        </div>
                        <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 hidden'}`}>Back to Site</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        title={!isExpanded ? "Logout" : ""}
                        className="w-full flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all relative group"
                    >
                        <div className="flex items-center justify-center min-w-[20px]">
                            <LogOut size={18} />
                        </div>
                        <span className={`whitespace-nowrap transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0 hidden'}`}>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen relative z-[1]">
                {/* Mobile Header */}
                <header className="md:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
                    >
                        <Menu size={22} />
                    </button>
                    <h1 className="text-lg font-extrabold tracking-tighter">
                        <span className="text-gray-900">VERNO</span>
                        <span className="text-vernovate-primary">VATE</span>
                    </h1>
                </header>

                {/* Page content */}
                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
