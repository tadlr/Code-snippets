import { PrismaClient, Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

/**
 * Middleware to check if the user is blocked by the author or banned from the site.
 *
 * This middleware checks if the current user is blocked by the author (based on `authorId` from the request body) or if the user is banned (temporarily or permanently) from the platform. If the user is blocked or banned, a 403 Forbidden response is returned. Otherwise, the request proceeds to the next middleware.
 *
 * @param {CustomRequest} req - Express request object, extended to include the user property.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Calls `next()` if the user is not blocked or banned, otherwise returns a 403 Forbidden response.
 *
 * @example
 * // Use checkBlocked middleware in a route
 * app.post('/messages', checkBlocked, sendMessage);
 */
const checkBlocked = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { authorId } = req.body;
  const userId = Number(req.user?.id);

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    // Check if the user is blocked by the author
    const isBlocked = await prisma.block.findFirst({
      where: {
        blockedById: authorId,
        blockedUserId: userId,
      },
    });

    if (isBlocked) {
      res.status(403).json({ message: 'You are blocked by this user' });
      return;
    }

    // Check if the user is banned
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    // If the user is banned, check if it's temporary or permanent
    if (user?.banned) {
      if (user.banExpiry && dayjs(user.banExpiry).isAfter(dayjs())) {
        res.status(403).json({
          message: `You are temporarily banned until ${dayjs(user.banExpiry).format('YYYY-MM-DD HH:mm:ss')}`,
        });
        return;
      }

      // Permanently banned users
      res.status(403).json({ message: 'You are permanently banned from the site' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as any).message });
  }
};

export default checkBlocked;
