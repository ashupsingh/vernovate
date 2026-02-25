import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Clock, ChevronDown, ChevronUp, User, Trash2, CheckCircle, Briefcase, FolderOpen, MessageSquare, Reply, Send, Loader2, AlertTriangle } from 'lucide-react';
import api from '../../lib/api';

const typeBadge = {
    contact: { label: 'Contact', bg: 'bg-blue-50', text: 'text-blue-600', icon: MessageSquare },
    application: { label: 'Application', bg: 'bg-purple-50', text: 'text-purple-600', icon: Briefcase },
    project: { label: 'Project', bg: 'bg-amber-50', text: 'text-amber-600', icon: FolderOpen },
};

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);
    const [filterType, setFilterType] = useState('all');
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [replySending, setReplySending] = useState(false);
    const [replySuccess, setReplySuccess] = useState(null);
    const [deleteModal, setDeleteModal] = useState({ open: false, msgId: null });

    const fetchMessages = async () => {
        try {
            const { data } = await api.get('/admin/contacts');
            setMessages(data.contacts || []);
        } catch (err) {
            console.error('Failed to fetch messages:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleMarkRead = async (id) => {
        try {
            await api.patch(`/admin/contacts/${id}/read`);
            fetchMessages();
        } catch (err) {
            console.error('Failed to mark as read:', err);
        }
    };

    const openDeleteModal = (id) => {
        setDeleteModal({ open: true, msgId: id });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ open: false, msgId: null });
    };

    const confirmDelete = async () => {
        if (!deleteModal.msgId) return;
        try {
            await api.delete(`/admin/contacts/${deleteModal.msgId}`);
            fetchMessages();
        } catch (err) {
            console.error('Failed to delete:', err);
        } finally {
            closeDeleteModal();
        }
    };

    const handleReply = async (id) => {
        if (!replyText.trim()) return;
        setReplySending(true);
        try {
            await api.post(`/admin/contacts/${id}/reply`, { message: replyText });
            setReplySuccess(id);
            setReplyText('');
            fetchMessages();
            setTimeout(() => {
                setReplySuccess(null);
                setReplyingTo(null);
            }, 2000);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to send reply');
        } finally {
            setReplySending(false);
        }
    };

    const filteredMessages = filterType === 'all'
        ? messages
        : messages.filter(m => (m.type || 'contact') === filterType);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-3 border-vernovate-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                    <p className="text-gray-500 text-sm mt-1">All form submissions from your website</p>
                </div>

                {/* Filter tabs */}
                <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                    {[
                        { key: 'all', label: 'All' },
                        { key: 'contact', label: 'Contact' },
                        { key: 'application', label: 'Applications' },
                        { key: 'project', label: 'Projects' },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setFilterType(tab.key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filterType === tab.key
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {tab.label}
                            {tab.key !== 'all' && (
                                <span className="ml-1 text-gray-400">
                                    {messages.filter(m => (m.type || 'contact') === tab.key).length}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {filteredMessages.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                    <Mail size={40} className="text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-400">No messages yet</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredMessages.map((msg, i) => {
                        const badge = typeBadge[msg.type || 'contact'] || typeBadge.contact;
                        const BadgeIcon = badge.icon;

                        return (
                            <motion.div
                                key={msg._id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={`bg-white rounded-2xl border overflow-hidden transition-all ${msg.isRead ? 'border-gray-200' : 'border-vernovate-primary/30 shadow-sm shadow-vernovate-primary/5'
                                    }`}
                            >
                                <button
                                    onClick={() => setExpandedId(expandedId === msg._id ? null : msg._id)}
                                    className="w-full flex items-center gap-3 p-3 sm:p-5 text-left hover:bg-gray-50/50 transition-colors"
                                >
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.isRead ? 'bg-gray-100' : 'bg-vernovate-primary/10'
                                        }`}>
                                        <User size={18} className={msg.isRead ? 'text-gray-400' : 'text-vernovate-primary'} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className={`text-sm font-medium truncate ${msg.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
                                                {msg.name}
                                            </p>
                                            {!msg.isRead && <span className="w-2 h-2 bg-vernovate-primary rounded-full flex-shrink-0" />}
                                        </div>
                                        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                            <p className="text-xs text-gray-400 truncate max-w-[120px] sm:max-w-none">{msg.subject || msg.email}</p>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0 ${badge.bg} ${badge.text}`}>
                                                <BadgeIcon size={10} />
                                                {badge.label}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 sm:gap-3 flex-shrink-0">
                                        <span className="text-xs text-gray-400 hidden sm:inline">
                                            {new Date(msg.createdAt).toLocaleDateString()}
                                        </span>
                                        {expandedId === msg._id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {expandedId === msg._id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5 border-t border-gray-100 pt-4">
                                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                                    <Mail size={12} />
                                                    <span>{msg.email}</span>
                                                    <span className="mx-1">•</span>
                                                    <Clock size={12} />
                                                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                                                </div>
                                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap bg-gray-50 rounded-xl p-4">
                                                    {msg.message}
                                                </p>

                                                {/* Previous replies */}
                                                {msg.replies && msg.replies.length > 0 && (
                                                    <div className="mt-4 space-y-3">
                                                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                                                            <Reply size={12} />
                                                            Replies ({msg.replies.length})
                                                        </p>
                                                        {msg.replies.map((r, idx) => (
                                                            <div key={idx} className="bg-vernovate-primary/5 border border-vernovate-primary/15 rounded-xl p-4">
                                                                <div className="flex items-center justify-between mb-2">
                                                                    <span className="text-xs font-semibold text-vernovate-primary">{r.repliedBy || 'Admin'}</span>
                                                                    <span className="text-[11px] text-gray-400">{new Date(r.repliedAt).toLocaleString()}</span>
                                                                </div>
                                                                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{r.message}</p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}

                                                {/* Reply section */}
                                                <AnimatePresence>
                                                    {replyingTo === msg._id && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0 }}
                                                            animate={{ opacity: 1, height: 'auto' }}
                                                            exit={{ opacity: 0, height: 0 }}
                                                            className="mt-4 overflow-hidden"
                                                        >
                                                            {replySuccess === msg._id ? (
                                                                <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm font-medium">
                                                                    <CheckCircle size={16} />
                                                                    Reply sent successfully to {msg.email}
                                                                </div>
                                                            ) : (
                                                                <div className="space-y-3">
                                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                        <Reply size={12} />
                                                                        <span>Replying to <strong>{msg.name}</strong> ({msg.email})</span>
                                                                    </div>
                                                                    <textarea
                                                                        value={replyText}
                                                                        onChange={(e) => setReplyText(e.target.value)}
                                                                        placeholder="Type your reply here... This will be sent to the user's email with Vernovate branding."
                                                                        rows={4}
                                                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all resize-none"
                                                                        disabled={replySending}
                                                                    />
                                                                    <div className="flex items-center gap-2 justify-end">
                                                                        <button
                                                                            onClick={() => { setReplyingTo(null); setReplyText(''); }}
                                                                            className="px-4 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-100 transition-colors"
                                                                            disabled={replySending}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                        <button
                                                                            onClick={() => handleReply(msg._id)}
                                                                            disabled={replySending || !replyText.trim()}
                                                                            className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold bg-vernovate-primary text-black hover:bg-vernovate-accent transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                                                                        >
                                                                            {replySending ? (
                                                                                <>
                                                                                    <Loader2 size={14} className="animate-spin" />
                                                                                    Sending...
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <Send size={14} />
                                                                                    Send Reply
                                                                                </>
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {/* Action buttons */}
                                                <div className="flex gap-2 mt-4">
                                                    <button
                                                        onClick={() => {
                                                            setReplyingTo(replyingTo === msg._id ? null : msg._id);
                                                            setReplyText('');
                                                        }}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-vernovate-primary/10 text-vernovate-primary hover:bg-vernovate-primary/20 transition-colors"
                                                    >
                                                        <Reply size={14} />
                                                        Reply
                                                    </button>
                                                    {!msg.isRead && (
                                                        <button
                                                            onClick={() => handleMarkRead(msg._id)}
                                                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                                                        >
                                                            <CheckCircle size={14} />
                                                            Mark as Read
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => openDeleteModal(msg._id)}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                                                    >
                                                        <Trash2 size={14} />
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {createPortal(
                <AnimatePresence>
                    {deleteModal.open && (
                        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                                onClick={closeDeleteModal}
                            />

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                                className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mb-4">
                                        <AlertTriangle size={28} className="text-red-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Message</h3>
                                    <p className="text-sm text-gray-500 mb-6">
                                        Are you sure you want to delete this message? <br />
                                        <span className="text-red-400 text-xs mt-1 block">This action cannot be undone.</span>
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
                        </div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    );
};

export default Messages;
