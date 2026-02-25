import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertCircle, RotateCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const VerifyOTP = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(300); // 5 minutes
    const [resending, setResending] = useState(false);
    const inputRefs = useRef([]);
    const location = useLocation();
    const navigate = useNavigate();
    const { verifyOTP, resendOTP } = useAuth();

    const email = location.state?.email;
    const type = location.state?.type || 'signup';

    useEffect(() => {
        if (!email) {
            navigate('/login', { replace: true });
        }
    }, [email, navigate]);

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) return;
        const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    // Auto-focus first input
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    const formatTime = (s) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const handleChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-advance
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pasted.length === 6) {
            setOtp(pasted.split(''));
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length !== 6) {
            setError('Please enter the complete 6-digit code');
            return;
        }

        setError('');
        setLoading(true);

        try {
            await verifyOTP(email, code, type);
            if (type === 'login' || type === 'signup') {
                navigate('/', { replace: true });
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        setError('');
        try {
            await resendOTP(email, type);
            setCountdown(300);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setResending(false);
        }
    };

    if (!email) return null;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 px-4 py-20">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-vernovate-primary/5 rounded-full blur-3xl" />
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
                </div>

                <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-2xl p-8 shadow-xl shadow-gray-200/50 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-vernovate-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ShieldCheck size={32} className="text-vernovate-primary" />
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
                    <p className="text-gray-500 text-sm mb-8">
                        We've sent a 6-digit code to{' '}
                        <span className="text-vernovate-primary font-medium">{email}</span>
                    </p>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center justify-center gap-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm"
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* OTP Inputs */}
                        <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
                            {otp.map((digit, i) => (
                                <input
                                    key={i}
                                    ref={(el) => (inputRefs.current[i] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(i, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(i, e)}
                                    className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-vernovate-primary focus:ring-2 focus:ring-vernovate-primary/20 transition-all"
                                />
                            ))}
                        </div>

                        {/* Timer */}
                        <p className="text-gray-500 text-sm mb-6">
                            {countdown > 0 ? (
                                <>Code expires in <span className="text-vernovate-primary font-mono">{formatTime(countdown)}</span></>
                            ) : (
                                <span className="text-red-500">Code expired</span>
                            )}
                        </p>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || otp.some((d) => !d)}
                            className="w-full bg-vernovate-primary text-black font-bold py-3 px-6 rounded-xl hover:bg-vernovate-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-vernovate-primary/25"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                'Verify Code'
                            )}
                        </button>
                    </form>

                    {/* Resend */}
                    <div className="mt-6">
                        <button
                            onClick={handleResend}
                            disabled={resending || countdown > 270}
                            className="text-gray-400 text-sm hover:text-vernovate-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                        >
                            <RotateCw size={14} className={resending ? 'animate-spin' : ''} />
                            Resend code
                        </button>
                    </div>
                </div>

                <div className="text-center mt-6">
                    <Link to="/login" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
                        ← Back to login
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyOTP;
