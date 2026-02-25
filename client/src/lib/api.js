import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Attach JWT token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('vernovate_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 responses globally
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('vernovate_token');
            // Don't redirect if already on auth pages
            if (!window.location.pathname.startsWith('/login') &&
                !window.location.pathname.startsWith('/signup')) {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
