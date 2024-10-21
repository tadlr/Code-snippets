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
 * Middleware to add a follower to a user.
 *
 * @param {Request} req - Express request object containing the target user's ID to follow.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const addFollower = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Ensure that req.user is available
  if (!req.user || !req.user.id) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { id } = req.user; // The current authenticated user
  const { targetUserId } = req.body; // The user to be followed

  const followerId = parseInt(id, 10);
  const followingId = parseInt(targetUserId, 10);

  try {
    // Check if the user is already following the target user
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: parseInt(id, 10),
        followingId: parseInt(targetUserId, 10),
      },
    });

    if (existingFollow) {
      res.status(400).json({ message: 'You are already following this user' });
      return;
    }

    // Add the follower to the target user
    await prisma.follow.create({
      data: {
        followerId: parseInt(id, 10),
        followingId: targetUserId,
      },
    });

    res.status(201).json({ message: 'You are now following this user' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as any).message });
  }
};

/**
 * Middleware to remove a follower from a user.
 *
 * @param {Request} req - Express request object containing the target user's ID to unfollow.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>}
 */
export const removeFollower = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Ensure that req.user is available
  if (!req.user || !req.user.id) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }
  const { id } = req.user; // The current authenticated user
  const { targetUserId } = req.body; // The user to be unfollowed

  try {
    // Check if the user is following the target user
    const existingFollow = await prisma.follow.findFirst({
      where: {
        followerId: parseInt(id, 10),
        followingId: targetUserId,
      },
    });

    if (!existingFollow) {
      res.status(400).json({ message: 'You are not following this user' });
      return;
    }

    // Remove the follower from the target user
    await prisma.follow.delete({
      where: { id: existingFollow.id },
    });

    res.status(200).json({ message: 'You are no longer following this user' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as any).message });
  }
};
