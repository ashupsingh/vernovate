import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, AlertCircle, CheckCircle, ShieldCheck, Eye, EyeOff, Check, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const getPasswordStrength = (password) => {
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };

    const passed = Object.values(checks).filter(Boolean).length;
    let level = 'weak';
    let color = 'bg-red-500';
    let textColor = 'text-red-500';
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

const ForgotPassword = () => {
    const [step, setStep] = useState(1); // 1: email, 2: verify OTP, 3: new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { forgotPassword, verifyResetOTP, resetPassword, resendOTP } = useAuth();

    const strength = useMemo(() => getPasswordStrength(newPassword), [newPassword]);

    const handleSendCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await forgotPassword(email);
            setStep(2);
            setSuccess('If an account exists with this email, a reset code has been sent.');
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong.');
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await verifyResetOTP(email, otp);
            setStep(3);
            setSuccess('Code verified! Now set your new password.');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid or expired code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (strength.passed < 5) {
            setError('Please meet all password requirements');
            return;
        }

        setLoading(true);

        try {
            await resetPassword(email, otp, newPassword);
            setSuccess('Password reset successfully!');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Reset failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setError('');
        setLoading(true);
        try {
            await resendOTP(email, 'reset');
            setSuccess('A new reset code has been sent.');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to resend code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-20">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-vernovate-primary/5 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block">
                        <h1 className="text-3xl font-extrabold tracking-tighter">
                            <span className="text-gray-900">VERNO</span>
                            <span className="text-vernovate-primary">VATE</span>
                        </h1>
                    </Link>
                    <p className="text-gray-400 text-sm mt-2">Reset your password</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
                    {/* Step indicator */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-vernovate-primary text-black' : 'bg-gray-100 text-gray-400'}`}>
                            1
                        </div>
                        <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-vernovate-primary' : 'bg-gray-200'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-vernovate-primary text-black' : 'bg-gray-100 text-gray-400'}`}>
                            2
                        </div>
                        <div className={`w-12 h-0.5 ${step >= 3 ? 'bg-vernovate-primary' : 'bg-gray-200'}`} />
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 3 ? 'bg-vernovate-primary text-black' : 'bg-gray-100 text-gray-400'}`}>
                            3
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm"
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-6 text-sm"
                        >
                            <CheckCircle size={16} />
                            {success}
                        </motion.div>
                    )}

                    {/* Step 1: Enter Email */}
                    {step === 1 && (
                        <form onSubmit={handleSendCode} className="space-y-5">
                            <div className="text-center mb-4">
                                <div className="w-14 h-14 bg-vernovate-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Mail size={28} className="text-vernovate-primary" />
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Enter your email address and we'll send you a verification code to reset your password.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-vernovate-primary text-black font-bold py-3 px-6 rounded-xl hover:bg-vernovate-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-vernovate-primary/25"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Send Reset Code
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    {/* Step 2: Verify OTP */}
                    {step === 2 && (
                        <form onSubmit={handleVerifyOTP} className="space-y-5">
                            <div className="text-center mb-4">
                                <div className="w-14 h-14 bg-vernovate-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck size={28} className="text-vernovate-primary" />
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Enter the code sent to <span className="text-vernovate-primary font-medium">{email}</span>.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    placeholder="Enter 6-digit code"
                                    required
                                    maxLength={6}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-center text-xl font-mono tracking-widest placeholder:text-gray-400 placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading || otp.length !== 6}
                                className="w-full bg-vernovate-primary text-black font-bold py-3 px-6 rounded-xl hover:bg-vernovate-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-vernovate-primary/25"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Verify Code
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>

                            <div className="flex items-center justify-between">
                                <button
                                    type="button"
                                    onClick={handleResendCode}
                                    disabled={loading}
                                    className="text-vernovate-primary text-sm font-medium hover:text-vernovate-accent transition-colors disabled:opacity-50"
                                >
                                    Resend code
                                </button>
                                <button
                                    type="button"
                                    onClick={() => { setStep(1); setError(''); setSuccess(''); setOtp(''); }}
                                    className="text-gray-400 text-sm hover:text-gray-600 transition-colors"
                                >
                                    Use a different email
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Step 3: New Password */}
                    {step === 3 && (
                        <form onSubmit={handleResetPassword} className="space-y-5">
                            <div className="text-center mb-4">
                                <div className="w-14 h-14 bg-vernovate-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                    <Lock size={28} className="text-vernovate-primary" />
                                </div>
                                <p className="text-gray-500 text-sm">
                                    Create a new password for <span className="text-vernovate-primary font-medium">{email}</span>.
                                </p>
                            </div>

                            {/* New Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Create a strong password"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-12 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>

                                {/* Password strength indicator */}
                                {newPassword && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="mt-3 space-y-2"
                                    >
                                        {/* Strength bar */}
                                        <div className="flex items-center gap-3">
                                            <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${strength.percentage}%` }}
                                                    className={`h-full rounded-full transition-all duration-300 ${strength.color}`}
                                                />
                                            </div>
                                            <span className={`text-xs font-semibold capitalize ${strength.textColor}`}>
                                                {strength.level}
                                            </span>
                                        </div>

                                        {/* Requirements checklist */}
                                        <div className="grid grid-cols-1 gap-1">
                                            {requirements.map((req) => (
                                                <div key={req.key} className="flex items-center gap-2">
                                                    {strength.checks[req.key] ? (
                                                        <Check size={12} className="text-green-500 flex-shrink-0" />
                                                    ) : (
                                                        <X size={12} className="text-gray-300 flex-shrink-0" />
                                                    )}
                                                    <span className={`text-xs ${strength.checks[req.key] ? 'text-green-600' : 'text-gray-400'}`}>
                                                        {req.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                                <div className="relative">
                                    <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Repeat password"
                                        required
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                    />
                                </div>
                                {confirmPassword && newPassword !== confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                        <X size={12} /> Passwords do not match
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading || strength.passed < 5}
                                className="w-full bg-vernovate-primary text-black font-bold py-3 px-6 rounded-xl hover:bg-vernovate-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-vernovate-primary/25"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Reset Password
                                        <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-500 text-sm">
                            Remember your password?{' '}
                            <Link to="/login" className="text-vernovate-primary font-semibold hover:text-vernovate-accent transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
