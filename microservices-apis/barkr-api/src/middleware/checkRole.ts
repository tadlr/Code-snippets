import { PrismaClient, Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

interface CustomRequest extends Request {
  user: {
    id: string;
    role: Role;
  };
}

/**
 * Middleware to check if the user has the necessary role to access the resource.
 *
 * This middleware verifies if the user's role matches any of the allowed roles. If the user's role is included in the allowed roles, the request proceeds to the next middleware or route handler. Otherwise, a 403 Forbidden response is returned.
 *
 * @param {Array<string>} roles - Array of allowed roles (e.g., ['ADMIN', 'MODERATOR']).
 * @returns {Function} Express middleware function.
 *
 * @example
 * // Use checkRole in a route to allow only admins and moderators
 * app.post('/admin', checkRole(['ADMIN', 'MODERATOR']), adminHandler);
 */
const checkRole = (roles: string[]) => {
  return (req: CustomRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role || '';

    // Check if the user's role is in the allowed roles
    if (roles.includes(userRole)) {
      return next();
    } else {
      return res.status(403).json({ message: 'You do not have the necessary permissions' });
    }
  };
};

export default checkRole;
