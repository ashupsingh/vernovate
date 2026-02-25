import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, UserCheck, Mail, MailOpen, TrendingUp, Calendar } from 'lucide-react';
import api from '../../lib/api';

const StatCard = ({ icon: Icon, label, value, color, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.4 }}
        className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
    >
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
            <Icon size={22} />
        </div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className="text-gray-500 text-sm mt-1">{label}</p>
    </motion.div>
);

const Dashboard = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/admin/stats');
                setStats(data);
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-vernovate-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const statCards = [
        { icon: Users, label: 'Total Users', value: stats?.totalUsers || 0, color: 'bg-blue-50 text-blue-600' },
        { icon: UserCheck, label: 'Verified Users', value: stats?.verifiedUsers || 0, color: 'bg-green-50 text-green-600' },
        { icon: Mail, label: 'Total Messages', value: stats?.totalContacts || 0, color: 'bg-purple-50 text-purple-600' },
        { icon: MailOpen, label: 'Unread Messages', value: stats?.unreadContacts || 0, color: 'bg-amber-50 text-amber-600' },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 text-sm mt-1">Overview of your platform activity</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {statCards.map((card, i) => (
                    <StatCard key={card.label} {...card} delay={i * 0.1} />
                ))}
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl border border-gray-200 p-6"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-vernovate-primary/10 rounded-xl flex items-center justify-center">
                        <TrendingUp size={18} className="text-vernovate-primary" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Recent Signups</h2>
                        <p className="text-gray-500 text-xs">Last 7 days activity</p>
                    </div>
                </div>

                {stats?.signupsByDay && stats.signupsByDay.length > 0 ? (
                    <div className="space-y-3">
                        {stats.signupsByDay.map((day) => (
                            <div key={day._id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <Calendar size={14} className="text-gray-400" />
                                    <span className="text-sm text-gray-600">{day._id}</span>
                                </div>
                                <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded-full">
                                    {day.count} signup{day.count !== 1 ? 's' : ''}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400 text-sm text-center py-8">No recent signups to display</p>
                )}
            </motion.div>
        </div>
    );
};

export default Dashboard;
