import express, { Router, Request, Response } from 'express';
import { register, login } from '../controllers/authController';

// Initialize the router
const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               displayName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Server error
 */

/**
 * Route to register a new user.
 *
 * This route allows a user to register by providing a display name, email, and password.
 *
 * @route POST /auth/register
 * @group Auth - Operations related to user authentication
 * @param {Request} req - The Express request object containing the user data in the body.
 * @param {Response} res - The Express response object.
 * @returns {void}
 * @example
 * // Example request payload
 * {
 *   "displayName": "John Doe",
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
router.post('/register', (req: Request, res: Response) => {
  register(req, res);
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * Route to log in an existing user.
 *
 * This route allows an existing user to log in by providing their email and password.
 *
 * @route POST /auth/login
 * @group Auth - Operations related to user authentication
 * @param {Request} req - The Express request object containing the login credentials.
 * @param {Response} res - The Express response object.
 * @returns {void}
 * @example
 * // Example request payload
 * {
 *   "email": "john@example.com",
 *   "password": "password123"
 * }
 */
router.post('/login', (req: Request, res: Response) => {
  login(req, res);
});

export default router;
