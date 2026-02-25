import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, AlertCircle, Check, X } from 'lucide-react';
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

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuth();

    const strength = useMemo(() => getPasswordStrength(password), [password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (strength.passed < 5) {
            setError('Please meet all password requirements');
            return;
        }

        setLoading(true);

        try {
            const data = await signup(name, email, password);
            navigate('/verify-otp', { state: { email, type: 'signup' } });
        } catch (err) {
            setError(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const requirements = [
        { key: 'length', label: 'At least 8 characters' },
        { key: 'uppercase', label: 'One uppercase letter' },
        { key: 'lowercase', label: 'One lowercase letter' },
        { key: 'number', label: 'One number' },
        { key: 'special', label: 'One special character' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-20">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-vernovate-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-vernovate-primary/3 rounded-full blur-3xl" />
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
                    <p className="text-gray-400 text-sm mt-2">Create your account</p>
                </div>

                {/* Card */}
                <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-xl shadow-gray-200/50">
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

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <div className="relative">
                                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                    minLength={2}
                                    autoComplete="name"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-vernovate-primary/50 focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            {password && (
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
                            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
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
                            {confirmPassword && password !== confirmPassword && (
                                <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                                    <X size={12} /> Passwords do not match
                                </p>
                            )}
                        </div>

                        {/* Privacy Policy Checkbox */}
                        <div className="flex items-start gap-3">
                            <input
                                type="checkbox"
                                id="agreeToTerms"
                                checked={agreeToTerms}
                                onChange={(e) => setAgreeToTerms(e.target.checked)}
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-vernovate-primary focus:ring-vernovate-primary/30 cursor-pointer accent-vernovate-primary"
                            />
                            <label htmlFor="agreeToTerms" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                                I agree to the{' '}
                                <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-vernovate-primary font-semibold hover:underline">Terms of Service</a>
                                {' '}and{' '}
                                <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-vernovate-primary font-semibold hover:underline">Privacy Policy</a>
                            </label>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || !name.trim() || !email.trim() || strength.passed < 5 || password !== confirmPassword || !agreeToTerms}
                            className="w-full bg-vernovate-primary text-black font-bold py-3 px-6 rounded-xl hover:bg-vernovate-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-vernovate-primary/25"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-gray-500 text-sm">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="text-vernovate-primary font-semibold hover:text-vernovate-accent transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Back to home */}
                <div className="text-center mt-6">
                    <Link to="/" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
                        ← Back to website
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
