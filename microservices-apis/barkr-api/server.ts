import dotenv from 'dotenv';
import express, { Application } from 'express';
import cors from 'cors';
import authRoutes from './src/routes/authRoutes';
import postRoutes from './src/routes/postRoutes';
import chatRoutes from './src/routes/chatRoutes';
import commentsRoutes from './src/routes/commentRoutes';
import { swaggerUi, swaggerSpec } from './swagger';

// Load environment variables from .env file
dotenv.config();

// Initialize express application
const app: Application = express();

// Middleware setup
app.use(cors());
app.use(express.json());

/**
 * Authentication routes
 * @route /auth
 */
app.use('/auth', authRoutes);

/**
 * Post routes
 * @route /posts
 */
app.use('/posts', postRoutes);

/**
 * Chat routes
 * @route /chat
 */
app.use('/chat', chatRoutes);

/**
 * Comments routes
 * @route /comments
 */
app.use('/comments', commentsRoutes);

// Define the port from environment variables or use 3000 as default
const portFromEnv = process.env.PORT ? parseInt(process.env.PORT, 10) : null;
const PORT: number = portFromEnv && !isNaN(portFromEnv) ? portFromEnv : 3000;

/**
 * Start the server and listen on the defined port.
 */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * Swagger API documentation
 * @route /docs
 */
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

console.log(`API documentation available at http://localhost:${PORT}/docs`);

// Handle 404 for undefined routes
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Gracefully shut down the server
process.on('SIGINT', () => {
  console.log('SIGINT signal received. Shutting down gracefully...');
  process.exit(0);
});
