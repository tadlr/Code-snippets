import { PrismaClient, Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

/**
 * Middleware to check if the user is the owner of a resource.
 *
 * @param {string} resourceType - The Prisma model (e.g., 'post', 'comment', 'chat').
 * @param {string} userIdField - The field representing the owner (e.g., 'authorId').
 * @returns {Function} Express middleware function.
 *
 * @example
 * router.delete('/:id', checkOwnership('chat', 'authorId'), deleteChat);
 */
const checkOwnership = (resourceType: string, userIdField: string) => {
  return async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const userId = req.user.id;

    try {
      // Dynamically accessing the Prisma model
      const resource = await (prisma[resourceType as keyof PrismaClient] as any).findUnique({
        where: { id: parseInt(id) },
      });

      if (!resource) {
        res.status(404).json({ message: `${resourceType} not found` });
        return;
      }

      // Check if the current user owns the resource
      if (resource[userIdField] === userId) {
        next();
      } else {
        res.status(403).json({ message: 'You do not have permission to modify this resource' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: (error as any).message });
    }
  };
};

export default checkOwnership;
