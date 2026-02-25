import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import Cropper from 'react-easy-crop';
import { User, Mail, Lock, Eye, EyeOff, Check, X, AlertCircle, CheckCircle, Phone, MapPin, Calendar, UserCircle, Shield, ArrowLeft, Camera, Trash2, Plus, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SEO from '../components/SEO';
import api from '../lib/api';

// ── Crop helper ──────────────────────────────────────────────
const createImage = (url) =>
    new Promise((resolve, reject) => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.addEventListener('error', (err) => reject(err));
        img.setAttribute('crossOrigin', 'anonymous');
        img.src = url;
    });

const getCroppedImg = async (imageSrc, pixelCrop, rotation = 0) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const radian = (rotation * Math.PI) / 180;
    const sin = Math.abs(Math.sin(radian));
    const cos = Math.abs(Math.cos(radian));
    const bBoxW = image.width * cos + image.height * sin;
    const bBoxH = image.width * sin + image.height * cos;

    canvas.width = bBoxW;
    canvas.height = bBoxH;

    ctx.translate(bBoxW / 2, bBoxH / 2);
    ctx.rotate(radian);
    ctx.translate(-image.width / 2, -image.height / 2);
    ctx.drawImage(image, 0, 0);

    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    ctx.putImageData(data, 0, 0);

    return new Promise((resolve) => {
        canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.92);
    });
};

const getPasswordStrength = (password) => {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
    const passed = Object.values(checks).filter(Boolean).length;
    let level = 'weak', color = 'bg-red-500', textColor = 'text-red-500';
    if (passed >= 5) { level = 'strong'; color = 'bg-green-500'; textColor = 'text-green-600'; }
    else if (passed >= 3) { level = 'medium'; color = 'bg-amber-500'; textColor = 'text-amber-600'; }
    return { checks, passed, level, color, textColor, percentage: (passed / 5) * 100 };
};

const requirements = [
    { key: 'length', label: 'At least 8 characters' },
    { key: 'uppercase', label: 'One uppercase letter' },
    { key: 'lowercase', label: 'One lowercase letter' },
    { key: 'number', label: 'One number' },
    { key: 'special', label: 'One special character' },
];

const Profile = () => {
    const { user, updateProfile } = useAuth();

    const [activeTab, setActiveTab] = useState('profile');

    // Profile form
    const [name, setName] = useState(user?.name || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '');
    const [gender, setGender] = useState(user?.gender || '');
    const [location, setLocation] = useState(user?.location || '');
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });

    // Avatar
    const fileInputRef = useRef(null);
    const [avatarLoading, setAvatarLoading] = useState(false);

    // Crop state
    const [cropImage, setCropImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const onCropComplete = useCallback((_, croppedPixels) => {
        setCroppedAreaPixels(croppedPixels);
    }, []);

    // Sync when user loads
    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.phone || '');
            setBio(user.bio || '');
            setDateOfBirth(user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '');
            setGender(user.gender || '');
            setLocation(user.location || '');
        }
    }, [user]);

    // Password form
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    const strength = React.useMemo(() => getPasswordStrength(newPassword), [newPassword]);

    const hasProfileChanges = () => {
        if (!user) return false;
        return (
            name.trim() !== (user.name || '') ||
            phone.trim() !== (user.phone || '') ||
            bio.trim() !== (user.bio || '') ||
            dateOfBirth !== (user.dateOfBirth ? user.dateOfBirth.slice(0, 10) : '') ||
            gender !== (user.gender || '') ||
            location.trim() !== (user.location || '')
        );
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setProfileMessage({ type: '', text: '' });
        if (!name.trim() || name.trim().length < 2) {
            setProfileMessage({ type: 'error', text: 'Name must be at least 2 characters' });
            return;
        }
        setProfileLoading(true);
        try {
            await updateProfile({
                name: name.trim(),
                phone: phone.trim(),
                bio: bio.trim(),
                dateOfBirth: dateOfBirth || null,
                gender,
                location: location.trim(),
            });
            setProfileMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (err) {
            setProfileMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
        } finally {
            setProfileLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPasswordMessage({ type: '', text: '' });
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'Passwords do not match' });
            return;
        }
        if (strength.passed < 5) {
            setPasswordMessage({ type: 'error', text: 'Please meet all password requirements' });
            return;
        }
        setPasswordLoading(true);
        try {
            await api.put('/auth/change-password', { currentPassword, newPassword });
            setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (err) {
            setPasswordMessage({ type: 'error', text: err.response?.data?.message || 'Failed to change password' });
        } finally {
            setPasswordLoading(false);
        }
    };

    // When user picks a file → open crop modal instead of uploading directly
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            setProfileMessage({ type: 'error', text: 'Image must be under 5MB' });
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setCropImage(reader.result);
            setCrop({ x: 0, y: 0 });
            setZoom(1);
            setRotation(0);
        };
        reader.readAsDataURL(file);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleCropCancel = () => {
        setCropImage(null);
        setCroppedAreaPixels(null);
    };

    const handleCropConfirm = async () => {
        if (!croppedAreaPixels || !cropImage) return;
        setAvatarLoading(true);
        setCropImage(null);
        try {
            const blob = await getCroppedImg(cropImage, croppedAreaPixels, rotation);
            const formData = new FormData();
            formData.append('avatar', blob, 'avatar.jpg');
            await api.post('/auth/avatar', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            window.dispatchEvent(new Event('avatar-updated'));
        } catch (err) {
            setProfileMessage({ type: 'error', text: err.response?.data?.message || 'Failed to upload avatar' });
        } finally {
            setAvatarLoading(false);
        }
    };

    const handleAvatarRemove = async () => {
        setAvatarLoading(true);
        try {
            await api.delete('/auth/avatar');
            window.dispatchEvent(new Event('avatar-updated'));
        } catch (err) {
            setProfileMessage({ type: 'error', text: err.response?.data?.message || 'Failed to remove avatar' });
        } finally {
            setAvatarLoading(false);
        }
    };

    const initials = user?.name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?';
    const joinDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

    return (
        <div className="min-h-screen pt-8 pb-8 bg-gray-50/50">
            <SEO title="My Profile" path="/profile" description="Manage your Vernovate account and profile settings." noindex={true} />

            <div className="container mx-auto px-4 md:px-8 max-w-7xl">
                {/* Back link */}
                <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-black text-sm mb-6 transition-colors">
                    <ArrowLeft size={16} /> Back to home
                </Link>

                {/* Two-column grid — matched wireframe layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

                    {/* ─── LEFT PANEL: My Profile Card ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-4"
                    >
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col">
                            {/* Card header */}
                            <div className="px-6 py-5 border-b border-gray-100">
                                <h2 className="text-lg font-bold text-black">My Profile</h2>
                            </div>

                            {/* Avatar & identity */}
                            <div className="px-6 pt-8 pb-6 text-center flex-shrink-0">
                                <div className="relative w-28 h-28 mx-auto mb-5 group">
                                    {user?.avatar ? (
                                        <img
                                            src={user.avatar}
                                            alt={user.name}
                                            className="w-28 h-28 rounded-full object-cover shadow-md"
                                        />
                                    ) : (
                                        <div className="w-28 h-28 rounded-full bg-vernovate-primary flex items-center justify-center text-black text-4xl font-bold shadow-md">
                                            {initials}
                                        </div>
                                    )}



                                    {/* Loading spinner */}
                                    {avatarLoading && (
                                        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center">
                                            <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}

                                    {/* Plus badge – always visible */}
                                    {!avatarLoading && (
                                        <button
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                            className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-vernovate-primary text-black flex items-center justify-center shadow-lg border-2 border-white hover:scale-110 transition-transform cursor-pointer"
                                            title="Upload photo"
                                        >
                                            <Plus size={16} strokeWidth={3} />
                                        </button>
                                    )}

                                    {/* Remove button */}
                                    {user?.avatar && !avatarLoading && (
                                        <button
                                            type="button"
                                            onClick={handleAvatarRemove}
                                            className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                                            title="Remove photo"
                                        >
                                            <Trash2 size={13} />
                                        </button>
                                    )}

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={handleFileSelect}
                                        className="hidden"
                                    />
                                </div>

                                <h3 className="text-xl font-bold text-black">{user?.name}</h3>
                                <p className="text-gray-500 text-sm mt-1">{user?.email}</p>

                                {/* Badges */}
                                <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-full ${
                                        user?.role === 'superadmin' ? 'bg-purple-100 text-purple-700' :
                                        user?.role === 'admin' ? 'bg-blue-100 text-blue-700' :
                                        'bg-gray-100 text-gray-600'
                                    }`}>
                                        <Shield size={12} />
                                        {user?.role === 'superadmin' ? 'Super Admin' : user?.role === 'admin' ? 'Admin' : 'Member'}
                                    </span>
                                    {user?.isVerified && (
                                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-50 px-3 py-1.5 rounded-full">
                                            <Check size={12} /> Verified
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Details list */}
                            <div className="border-t border-gray-100 px-6 py-5 space-y-4 flex-1">
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                        <Mail size={14} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Email</p>
                                        <p className="text-gray-700 text-sm">{user?.email}</p>
                                    </div>
                                </div>
                                {user?.phone && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                            <Phone size={14} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Phone</p>
                                            <p className="text-gray-700 text-sm">{user.phone}</p>
                                        </div>
                                    </div>
                                )}
                                {user?.location && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={14} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Location</p>
                                            <p className="text-gray-700 text-sm">{user.location}</p>
                                        </div>
                                    </div>
                                )}
                                {user?.dateOfBirth && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                            <Calendar size={14} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Date of Birth</p>
                                            <p className="text-gray-700 text-sm">
                                                {new Date(user.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {user?.gender && user.gender !== '' && (
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                            <UserCircle size={14} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Gender</p>
                                            <p className="text-gray-700 text-sm capitalize">
                                                {user.gender === 'prefer-not-to-say' ? 'Prefer not to say' : user.gender}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3 text-sm">
                                    <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0">
                                        <Calendar size={14} className="text-gray-400" />
                                    </div>
                                    <div>
                                        <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium">Member Since</p>
                                        <p className="text-gray-700 text-sm">{joinDate}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bio section — always at bottom */}
                            {user?.bio && (
                                <div className="border-t border-gray-100 px-6 py-5">
                                    <p className="text-[11px] text-gray-400 uppercase tracking-wider font-medium mb-2">About</p>
                                    <p className="text-sm text-gray-600 leading-relaxed">{user.bio}</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* ─── RIGHT PANEL: Edit Profile & Change Password ─── */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="md:col-span-8"
                    >
                        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col">
                            {/* Tabs */}
                            <div className="flex border-b border-gray-200 flex-shrink-0">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative ${
                                        activeTab === 'profile' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    Edit Profile
                                    {activeTab === 'profile' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-vernovate-primary" />
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('password')}
                                    className={`flex-1 py-4 text-sm font-semibold text-center transition-colors relative ${
                                        activeTab === 'password' ? 'text-black' : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                >
                                    Change Password
                                    {activeTab === 'password' && (
                                        <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-vernovate-primary" />
                                    )}
                                </button>
                            </div>

                            <div className="p-6 md:p-8 flex-1">
                                {/* ── Edit Profile Tab ── */}
                                {activeTab === 'profile' && (
                                    <form onSubmit={handleProfileUpdate} className="space-y-5 h-full flex flex-col">
                                        {profileMessage.text && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${
                                                    profileMessage.type === 'success'
                                                        ? 'bg-green-50 border border-green-200 text-green-600'
                                                        : 'bg-red-50 border border-red-200 text-red-600'
                                                }`}
                                            >
                                                {profileMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                                {profileMessage.text}
                                            </motion.div>
                                        )}

                                        <div className="space-y-5 flex-1">
                                            {/* Full Name */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                                <div className="relative">
                                                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                        minLength={2}
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                                    />
                                                </div>
                                            </div>

                                            {/* Row: Phone & Location */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                                                    <div className="relative">
                                                        <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="tel"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            placeholder="+91 98765 43210"
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                                                    <div className="relative">
                                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="text"
                                                            value={location}
                                                            onChange={(e) => setLocation(e.target.value)}
                                                            placeholder="Guwahati, Assam"
                                                            maxLength={100}
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Row: Date of Birth & Gender */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                                                    <div className="relative">
                                                        <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <input
                                                            type="date"
                                                            value={dateOfBirth}
                                                            onChange={(e) => setDateOfBirth(e.target.value)}
                                                            max={new Date().toISOString().slice(0, 10)}
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                                                    <div className="relative">
                                                        <UserCircle size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                        <select
                                                            value={gender}
                                                            onChange={(e) => setGender(e.target.value)}
                                                            className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all appearance-none"
                                                        >
                                                            <option value="">Select gender</option>
                                                            <option value="male">Male</option>
                                                            <option value="female">Female</option>
                                                            <option value="other">Other</option>
                                                            <option value="prefer-not-to-say">Prefer not to say</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Bio */}
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                                                <textarea
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                    rows={3}
                                                    maxLength={200}
                                                    placeholder="Tell us a little about yourself..."
                                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all resize-none"
                                                />
                                                <p className="text-xs text-gray-400 mt-1 text-right">{bio.length}/200</p>
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={profileLoading || !hasProfileChanges()}
                                            className="w-full bg-vernovate-primary text-black font-bold py-3 px-6 rounded-xl hover:bg-vernovate-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-vernovate-primary/25 mt-4"
                                        >
                                            {profileLoading ? (
                                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                'Save Changes'
                                            )}
                                        </button>
                                    </form>
                                )}

                                {/* ── Change Password Tab ── */}
                                {activeTab === 'password' && (
                                    <form onSubmit={handlePasswordChange} className="space-y-5 h-full flex flex-col">
                                        {passwordMessage.text && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm ${
                                                    passwordMessage.type === 'success'
                                                        ? 'bg-green-50 border border-green-200 text-green-600'
                                                        : 'bg-red-50 border border-red-200 text-red-600'
                                                }`}
                                            >
                                                {passwordMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                                                {passwordMessage.text}
                                            </motion.div>
                                        )}

                                        <div className="space-y-5 flex-1">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                                                <div className="relative">
                                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type={showCurrentPassword ? 'text' : 'password'}
                                                        value={currentPassword}
                                                        onChange={(e) => setCurrentPassword(e.target.value)}
                                                        placeholder="Enter current password"
                                                        required
                                                        autoComplete="current-password"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                                    />
                                                    <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                                        {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                                <div className="relative">
                                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        value={newPassword}
                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                        placeholder="Create a strong password"
                                                        required
                                                        autoComplete="new-password"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                                    />
                                                    <button type="button" onClick={() => setShowNewPassword(!showNewPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                    </button>
                                                </div>

                                                {newPassword && (
                                                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 space-y-2">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                                <motion.div initial={{ width: 0 }} animate={{ width: `${strength.percentage}%` }} className={`h-full rounded-full transition-all duration-300 ${strength.color}`} />
                                                            </div>
                                                            <span className={`text-xs font-semibold capitalize ${strength.textColor}`}>{strength.level}</span>
                                                        </div>
                                                        <div className="grid grid-cols-1 gap-1">
                                                            {requirements.map((req) => (
                                                                <div key={req.key} className="flex items-center gap-2">
                                                                    {strength.checks[req.key] ? <Check size={12} className="text-green-500 flex-shrink-0" /> : <X size={12} className="text-gray-300 flex-shrink-0" />}
                                                                    <span className={`text-xs ${strength.checks[req.key] ? 'text-green-600' : 'text-gray-400'}`}>{req.label}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                                <div className="relative">
                                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                                    <input
                                                        type={showNewPassword ? 'text' : 'password'}
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        placeholder="Repeat new password"
                                                        required
                                                        autoComplete="new-password"
                                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                                    />
                                                </div>
                                                {confirmPassword && newPassword !== confirmPassword && (
                                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                                        <X size={12} /> Passwords do not match
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={passwordLoading || strength.passed < 5 || !currentPassword || newPassword !== confirmPassword}
                                            className="w-full bg-vernovate-primary text-black font-bold py-3 px-6 rounded-xl hover:bg-vernovate-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-vernovate-primary/25 mt-4"
                                        >
                                            {passwordLoading ? (
                                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                            ) : (
                                                'Change Password'
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Crop Modal */}
            {cropImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-black">Crop Photo</h3>
                            <button onClick={handleCropCancel} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        {/* Crop area */}
                        <div className="relative w-full aspect-square bg-gray-900">
                            <Cropper
                                image={cropImage}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={1}
                                cropShape="round"
                                showGrid={false}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onRotationChange={setRotation}
                                onCropComplete={onCropComplete}
                            />
                        </div>

                        {/* Controls */}
                        <div className="px-5 py-4 space-y-3">
                            {/* Zoom */}
                            <div className="flex items-center gap-3">
                                <ZoomOut size={16} className="text-gray-400 flex-shrink-0" />
                                <input
                                    type="range"
                                    min={1}
                                    max={3}
                                    step={0.05}
                                    value={zoom}
                                    onChange={(e) => setZoom(Number(e.target.value))}
                                    className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-vernovate-primary"
                                />
                                <ZoomIn size={16} className="text-gray-400 flex-shrink-0" />
                            </div>

                            {/* Rotate */}
                            <div className="flex items-center gap-3">
                                <RotateCw size={16} className="text-gray-400 flex-shrink-0" />
                                <input
                                    type="range"
                                    min={0}
                                    max={360}
                                    step={1}
                                    value={rotation}
                                    onChange={(e) => setRotation(Number(e.target.value))}
                                    className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-vernovate-primary"
                                />
                                <span className="text-xs text-gray-500 w-8 text-right">{rotation}°</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 px-5 py-4 border-t border-gray-100">
                            <button
                                onClick={handleCropCancel}
                                className="flex-1 py-2.5 px-4 rounded-xl border border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCropConfirm}
                                className="flex-1 py-2.5 px-4 rounded-xl bg-vernovate-primary text-black font-bold hover:bg-vernovate-accent transition-colors shadow-lg shadow-vernovate-primary/25 cursor-pointer"
                            >
                                Upload
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Profile;
