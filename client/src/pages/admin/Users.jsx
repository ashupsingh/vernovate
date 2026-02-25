import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Shield, ShieldCheck, User as UserIcon, Trash2, ChevronDown, AlertTriangle } from 'lucide-react';
import api from '../../lib/api';
import { useAuth } from '../../context/AuthContext';

const roleBadge = {
    user: 'bg-gray-100 text-gray-600',
    admin: 'bg-blue-50 text-blue-600',
    superadmin: 'bg-amber-50 text-amber-700',
};

const Users = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [loading, setLoading] = useState(true);
    const [deleteModal, setDeleteModal] = useState({ open: false, userId: null, userName: '' });
    const { user: currentUser } = useAuth();

    const fetchUsers = async () => {
        try {
            const params = {};
            if (search) params.search = search;
            if (roleFilter) params.role = roleFilter;
            const { data } = await api.get('/admin/users', { params });
            setUsers(data.users || []);
        } catch (err) {
            console.error('Failed to fetch users:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [roleFilter]);

    useEffect(() => {
        const timer = setTimeout(fetchUsers, 400);
        return () => clearTimeout(timer);
    }, [search]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            await api.patch(`/admin/users/${userId}/role`, { role: newRole });
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to update role');
        }
    };

    const openDeleteModal = (userId, userName) => {
        setDeleteModal({ open: true, userId, userName });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, userId: null, userName: '' });
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/admin/users/${deleteModal.userId}`);
            fetchUsers();
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to delete user');
        } finally {
            closeDeleteModal();
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Users</h1>
                <p className="text-gray-500 text-sm mt-1">Manage your platform users</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search by name or email..."
                        className="w-full bg-white border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                    />
                </div>
                <div className="relative">
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="appearance-none bg-white border border-gray-200 rounded-xl px-4 pr-10 py-2.5 text-gray-900 text-sm focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all cursor-pointer"
                    >
                        <option value="">All Roles</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="superadmin">Super Admin</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center h-40">
                        <div className="w-6 h-6 border-2 border-vernovate-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : users.length === 0 ? (
                    <p className="text-gray-400 text-sm text-center py-12">No users found</p>
                ) : (
                    <>
                        {/* Mobile Card Layout */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {users.map((u, i) => (
                                <motion.div
                                    key={u._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="p-4 space-y-3"
                                >
                                    <div className="flex items-center gap-3">
                                        {u.avatar ? (
                                            <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-10 h-10 bg-vernovate-primary/10 rounded-full flex items-center justify-center">
                                                <span className="text-vernovate-primary font-bold text-sm">{u.name?.[0]?.toUpperCase()}</span>
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{u.name}</p>
                                            <p className="text-xs text-gray-400 truncate">{u.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 flex-wrap">
                                        <div className="flex items-center gap-2">
                                            {currentUser?.role === 'superadmin' && u.role !== 'superadmin' ? (
                                                <select
                                                    value={u.role}
                                                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                    className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none ${roleBadge[u.role]}`}
                                                >
                                                    <option value="user">User</option>
                                                    <option value="admin">Admin</option>
                                                </select>
                                            ) : (
                                                <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${roleBadge[u.role]}`}>
                                                    {u.role}
                                                </span>
                                            )}
                                            <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${u.isVerified ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                                {u.isVerified ? 'Verified' : 'Unverified'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</span>
                                            {currentUser?.role === 'superadmin' && u.role !== 'superadmin' && (
                                                <button
                                                    onClick={() => openDeleteModal(u._id, u.name)}
                                                    className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                                    title="Delete user"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Desktop Table Layout */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-100">
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">User</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Role</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Status</th>
                                        <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Joined</th>
                                        <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u, i) => (
                                        <motion.tr
                                            key={u._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {u.avatar ? (
                                                        <img src={u.avatar} alt={u.name} className="w-9 h-9 rounded-full object-cover" />
                                                    ) : (
                                                        <div className="w-9 h-9 bg-vernovate-primary/10 rounded-full flex items-center justify-center">
                                                            <span className="text-vernovate-primary font-bold text-sm">{u.name?.[0]?.toUpperCase()}</span>
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{u.name}</p>
                                                        <p className="text-xs text-gray-400">{u.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {currentUser?.role === 'superadmin' && u.role !== 'superadmin' ? (
                                                    <select
                                                        value={u.role}
                                                        onChange={(e) => handleRoleChange(u._id, e.target.value)}
                                                        className={`text-xs font-medium px-3 py-1.5 rounded-full border-0 cursor-pointer focus:outline-none ${roleBadge[u.role]}`}
                                                    >
                                                        <option value="user">User</option>
                                                        <option value="admin">Admin</option>
                                                    </select>
                                                ) : (
                                                    <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${roleBadge[u.role]}`}>
                                                        {u.role}
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`text-xs font-medium px-3 py-1.5 rounded-full ${u.isVerified ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                                    {u.isVerified ? 'Verified' : 'Unverified'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-400">
                                                {new Date(u.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                {currentUser?.role === 'superadmin' && u.role !== 'superadmin' && (
                                                    <button
                                                        onClick={() => openDeleteModal(u._id, u.name)}
                                                        className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                                        title="Delete user"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                )}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {createPortal(
                <AnimatePresence>
                    {deleteModal.open && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm"
                            onClick={closeDeleteModal}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm mx-4"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
                                        <AlertTriangle size={28} className="text-red-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Delete User</h3>
                                    <p className="text-sm text-gray-500 mb-1">
                                        Are you sure you want to delete
                                    </p>
                                    <p className="text-sm font-semibold text-gray-800 mb-1">
                                        "{deleteModal.userName}"?
                                    </p>
                                    <p className="text-xs text-red-400 mb-6">
                                        This action cannot be undone.
                                    </p>
                                    <div className="flex gap-3 w-full">
                                        <button
                                            onClick={closeDeleteModal}
                                            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={confirmDelete}
                                            className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-sm font-medium text-white hover:bg-red-600 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Users;
