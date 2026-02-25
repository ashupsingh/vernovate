import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Settings = () => {
    const { user } = useAuth();

    if (!user) return null;

    const infoItems = [
        { icon: User, label: 'Name', value: user.name },
        { icon: Mail, label: 'Email', value: user.email },
        { icon: Shield, label: 'Role', value: user.role?.charAt(0).toUpperCase() + user.role?.slice(1) },
        { icon: Calendar, label: 'Joined', value: new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 text-sm mt-1">Your admin profile information</p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden max-w-xl"
            >
                {/* Profile header */}
                <div className="bg-gradient-to-r from-vernovate-primary/5 to-vernovate-primary/10 p-8 text-center border-b border-gray-100">
                    <div className="w-20 h-20 bg-white border-2 border-vernovate-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gray-200/50">
                        <span className="text-vernovate-primary text-2xl font-bold">{user.name?.[0]?.toUpperCase()}</span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                    <span className="inline-block mt-2 text-xs font-medium px-3 py-1 rounded-full bg-amber-50 text-amber-700">
                        {user.role}
                    </span>
                </div>

                {/* Info items */}
                <div className="p-6 space-y-1">
                    {infoItems.map((item, i) => (
                        <div key={item.label} className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                <item.icon size={16} className="text-gray-500" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-400">{item.label}</p>
                                <p className="text-sm font-medium text-gray-900">{item.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default Settings;
