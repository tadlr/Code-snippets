import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

/**
 * Middleware for authenticating users by verifying JWT tokens.
 *
 * The middleware extracts the token from the `Authorization` header, verifies it, and attaches the user object to the request. If the token is missing, invalid, or if the user is not found, a 401 Unauthorized response is returned.
 *
 * @param {CustomRequest} req - Express request object, extended to include the user property.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Calls `next()` if the token is valid, otherwise returns a 401 Unauthorized response.
 *
 * @example
 * // Use authMiddleware in a route
 * app.get('/protected', authMiddleware, (req, res) => {
 *   res.json({ message: 'Protected resource' });
 * });
 */
const authMiddleware = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };

    const user = await prisma.user.findUnique({
      where: { id: Number(decoded.id) },
    });

    if (!user) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Attach the user to the request object
    req.user = { id: user.id.toString(), role: user.role };

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;
