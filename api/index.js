import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import connectDB from '../server/config/db.js';
import authRoutes from '../server/routes/auth.js';
import adminRoutes from '../server/routes/admin.js';
import contactRoutes from '../server/routes/contact.js';

// dotenv is only needed locally — Vercel injects env vars automatically
if (process.env.NODE_ENV !== 'production') {
    const dotenv = await import('dotenv');
    dotenv.config({ path: './server/.env' });
}

const app = express();

// ──── Middleware ────
// Allowed origins for CORS (credentials:true is incompatible with origin:'*')
const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://localhost:5173',
    'http://localhost:3000',
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (mobile apps, Postman, server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(null, false);
        }
    },
    credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Rate limiting for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { message: 'Too many requests, please try again later.' },
});

// Lazy DB connection (one per cold start)
let isConnected = false;
const ensureDbConnected = async (req, res, next) => {
    try {
        if (!isConnected) {
            await connectDB();
            isConnected = true;
        }
        next();
    } catch (err) {
        console.error('Database connection failed:', err.message);
        // Reset so next request retries the connection
        isConnected = false;
        res.status(500).json({ message: 'Database connection failed' });
    }
};

app.use(ensureDbConnected);

// ──── Routes ────
app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler for API routes
app.use((req, res) => {
    res.status(404).json({ message: 'API route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ message: 'Internal server error' });
});

export default app;
