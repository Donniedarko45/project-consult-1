import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import { errorMiddleware } from './middlewares/error.middleware';
import { apiRateLimiter } from './middlewares/rateLimit.middleware';

// Import routes
import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import planRoutes from './modules/plan/plan.routes';
import subscriptionRoutes from './modules/subscription/subscription.routes';
import paymentRoutes from './modules/payment/payment.routes';
import webhookRoutes from './modules/payment/webhook.routes';
import ekycRoutes from './modules/ekyc/ekyc.routes';

const app: Express = express();

// Trust proxy - required for rate limiting to work behind reverse proxies (e.g., Render, Heroku)
app.set('trust proxy', 1);

// ===========================================
// MIDDLEWARE
// ===========================================

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
app.use(apiRateLimiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===========================================
// ROUTES
// ===========================================

// Health check
app.get('/health', (_req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Stock Course Backend API is running',
        timestamp: new Date().toISOString(),
    });
});

app.get('/api/health', (_req: Request, res: Response) => {
    res.json({
        success: true,
        message: 'Stock Course Backend API is running',
        timestamp: new Date().toISOString(),
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/webhooks', webhookRoutes);
app.use('/api/ekyc', ekycRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

// Error handling middleware (must be last)
app.use(errorMiddleware);

// ===========================================
// SERVER START
// ===========================================

const PORT = Number(process.env.PORT) || config.port || 3000;


app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🚀 Stock Course Backend API                               ║
║                                                            ║
║   Server running on: http://localhost:$PORT}               ║
║   Environment: ${config.nodeEnv.padEnd(40)}       ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

export default app;
