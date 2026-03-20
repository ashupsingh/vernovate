import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import api from '../lib/api';

const AuthContext = createContext(null);

// Session timeout: 45 minutes of inactivity
const SESSION_TIMEOUT_MS = 45 * 60 * 1000;
const ACTIVITY_KEY = 'vernovate_last_activity';

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
    const sessionTimerRef = useRef(null);

    // Logout function (defined early so it can be referenced)
    const logout = useCallback(() => {
        localStorage.removeItem('vernovate_token');
        localStorage.removeItem(ACTIVITY_KEY);
        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        setUser(null);
    }, []);

    // Record user activity and reset session timer
    const resetSessionTimer = useCallback(() => {
        if (!localStorage.getItem('vernovate_token')) return;

        localStorage.setItem(ACTIVITY_KEY, Date.now().toString());

        if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        sessionTimerRef.current = setTimeout(() => {
            logout();
        }, SESSION_TIMEOUT_MS);
    }, [logout]);

    // Check if session has expired (e.g. user returns after closing tab)
    const isSessionExpired = useCallback(() => {
        const lastActivity = localStorage.getItem(ACTIVITY_KEY);
        if (!lastActivity) return false;
        return Date.now() - parseInt(lastActivity, 10) > SESSION_TIMEOUT_MS;
    }, []);

    // Check for existing token on mount
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('vernovate_token');
            if (token) {
                // Check if session expired while tab was closed
                if (isSessionExpired()) {
                    logout();
                    setLoading(false);
                    return;
                }

                try {
                    const { data } = await api.get('/auth/me');
                    setUser(data.user);
                    resetSessionTimer();
                } catch {
                    localStorage.removeItem('vernovate_token');
                    localStorage.removeItem(ACTIVITY_KEY);
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    // Listen for user activity to reset the session timer
    useEffect(() => {
        if (!user) return;

        const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
        let throttleTimer = null;

        const throttledReset = () => {
            if (throttleTimer) return;
            throttleTimer = setTimeout(() => {
                throttleTimer = null;
                resetSessionTimer();
            }, 30000); // Throttle: update at most every 30 seconds
        };

        events.forEach((event) => window.addEventListener(event, throttledReset));
        resetSessionTimer(); // Start the timer

        return () => {
            events.forEach((event) => window.removeEventListener(event, throttledReset));
            if (throttleTimer) clearTimeout(throttleTimer);
            if (sessionTimerRef.current) clearTimeout(sessionTimerRef.current);
        };
    }, [user, resetSessionTimer]);

    // Handle 401 responses from API (token expired server-side)
    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401 && user) {
                    logout();
                }
                return Promise.reject(error);
            }
        );

        return () => api.interceptors.response.eject(interceptor);
    }, [user, logout]);

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
            localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
            setUser(data.user);
        }
        return data;
    };

    const verifyOTP = async (email, code, type = 'signup') => {
        const endpoint = type === 'login' ? '/auth/verify-login' : '/auth/verify-otp';
        const { data } = await api.post(endpoint, { email, code, type });
        if (data.token) {
            localStorage.setItem('vernovate_token', data.token);
            localStorage.setItem(ACTIVITY_KEY, Date.now().toString());
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
