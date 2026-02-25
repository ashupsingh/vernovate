import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('vernovate_token');
            if (token) {
                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data.user);
                } catch {
                    localStorage.removeItem('vernovate_token');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    // Refresh user data (used after avatar upload/remove)
    const refreshUser = async () => {
        try {
            const { data } = await api.get('/auth/me');
            setUser(data.user);
        } catch {}
    };

    // Listen for avatar-updated events
    useEffect(() => {
        const handler = () => refreshUser();
        window.addEventListener('avatar-updated', handler);
        return () => window.removeEventListener('avatar-updated', handler);
    }, []);

    const signup = async (name, email, password) => {
        const { data } = await api.post('/auth/signup', { name, email, password });
        return data;
    };

    const login = async (email, password) => {
        const { data } = await api.post('/auth/login', { email, password });
        if (data.token) {
            localStorage.setItem('vernovate_token', data.token);
            setUser(data.user);
        }
        return data;
    };

    const verifyOTP = async (email, code, type = 'signup') => {
        const endpoint = type === 'login' ? '/auth/verify-login' : '/auth/verify-otp';
        const { data } = await api.post(endpoint, { email, code, type });
        if (data.token) {
            localStorage.setItem('vernovate_token', data.token);
            setUser(data.user);
        }
        return data;
    };

    const forgotPassword = async (email) => {
        const { data } = await api.post('/auth/forgot-password', { email });
        return data;
    };

    const verifyResetOTP = async (email, code) => {
        const { data } = await api.post('/auth/verify-reset-otp', { email, code });
        return data;
    };

    const resetPassword = async (email, code, newPassword) => {
        const { data } = await api.post('/auth/reset-password', { email, code, newPassword });
        return data;
    };

    const resendOTP = async (email, type) => {
        const { data } = await api.post('/auth/resend-otp', { email, type });
        return data;
    };

    const updateProfile = async (updates) => {
        const { data } = await api.patch('/auth/profile', updates);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('vernovate_token');
        setUser(null);
    };

    const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';
    const isSuperAdmin = user?.role === 'superadmin';

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            signup,
            login,
            verifyOTP,
            forgotPassword,
            verifyResetOTP,
            resetPassword,
            resendOTP,
            updateProfile,
            logout,
            isAdmin,
            isSuperAdmin,
        }}>
            {children}
        </AuthContext.Provider>
    );
};
