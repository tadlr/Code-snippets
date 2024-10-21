import { PrismaClient, ChatRole, Role } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';

const prisma = new PrismaClient();

interface CustomRequest extends Request {
  user?: {
    id: string;
    role: Role;
  };
}

/**
 * Middleware to check if the user allows chats from non-followers.
 *
 * @param {CustomRequest} req - Express request object, extended to include the user property.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Calls `next()` if the user allows chats or the sender is a follower, otherwise returns a 403 Forbidden response.
 */
export const checkChatPermission = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user || !req.user.id) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const { authorId } = req.body;
  const userId = req.user.id;

  try {
    const userPreferences = await prisma.userPreferences.findUnique({
      where: { userId: Number(userId) },
    });

    if (!userPreferences?.allowChatsFromNonFollowers) {
      const isFollower = await prisma.follow.findFirst({
        where: {
          OR: [
            { followerId: Number(userId), followingId: Number(authorId) },
            { followerId: Number(authorId), followingId: Number(userId) },
          ],
        },
      });

      if (!isFollower) {
        res.status(403).json({ message: 'You only allow chats from followers' });
        return;
      }
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as any).message });
    return;
  }
};

/**
 * Middleware to check if the current user is an admin of a chat group.
 *
 * @param {CustomRequest} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Calls `next()` if the user is an admin, otherwise returns a 403 Forbidden response.
 */
export const checkAdminPermission = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { chatGroupId } = req.params;
  const userId = req.user?.id;

  try {
    // Check if the user has an ADMIN role in the chat group
    const userRole = await prisma.userRoleOnChatGroup.findFirst({
      where: {
        chatGroupId: Number(chatGroupId),
        userId: Number(userId),
        role: 'ADMIN',
      },
    });

    // If no admin role found, return forbidden
    if (!userRole) {
      return res.status(403).json({ message: 'You are not an admin of this group' });
    }

    // Proceed to next middleware if the user is an admin
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: (error as any).message });
  }
};

/**
 * Middleware to check if the current user is the owner of a chat message.
 *
 * @param {CustomRequest} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Calls `next()` if the user owns the message, otherwise returns a 403 Forbidden response.
 */
export const checkChatOwnership = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const userId = req.user?.id;

  try {
    const chatMessage = await prisma.chatMessage.findUnique({
      where: { id: Number(id) },
    });

    if (!chatMessage || chatMessage.senderId !== Number(userId)) {
      return res.status(403).json({ message: 'You do not have permission to modify this message' });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: (error as any).message });
  }
};

/**
 * Middleware to check if the user is a member of a chat group.
 *
 * @param {CustomRequest} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Calls `next()` if the user is a group member, otherwise returns a 403 Forbidden response.
 */
export const checkGroupMembership = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { chatGroupId } = req.params;
  const userId = req.user?.id;

  try {
    const membership = await prisma.userOnChat.findFirst({
      where: {
        chatGroupId: Number(chatGroupId),
        userId: Number(userId),
      },
    });

    if (!membership) {
      return res.status(403).json({ message: 'You are not a member of this chat group' });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Internal server error', error: (error as any).message });
  }
};

/**
 * Middleware to check if the user has been blocked from a specific chat group.
 *
 * @param {CustomRequest} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next middleware function.
 * @returns {Promise<void>} - Calls `next()` if the user is not blocked, otherwise returns a 403 Forbidden response.
 */
export const checkBlockedInChat = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { chatGroupId } = req.params;
  const userId = req.user?.id;

  try {
    const blocked = await prisma.blockChat.findFirst({
      where: {
        blockedUserId: Number(userId),
        chatGroupId: Number(chatGroupId),
      },
    });

    if (blocked) {
      res.status(403).json({ message: 'You have been blocked from this chat group' });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: (error as any).message });
    return;
  }
};

/**
 * Middleware to check if a user has a specific role (e.g., MODERATOR, ADMIN, OWNER) in a chat group.
 *
 * @param {ChatRole} requiredRole - The minimum role required to perform an action.
 * @returns {Function} - Express middleware function.
 */
/**
 * Middleware to check if a user has a specific role (e.g., MODERATOR, ADMIN, OWNER) in a chat group.
 *
 * @param {ChatRole} requiredRole - The minimum role required to perform an action.
 * @returns {Function} - Express middleware function.
 */
export const checkRole = (requiredRole: ChatRole) => {
  return async (req: CustomRequest, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    const { chatGroupId } = req.params;

    try {
      // Use the compound unique key `userId_chatGroupId`
      const userRole = await prisma.userRoleOnChatGroup.findUnique({
        where: {
          userId_chatGroupId: {
            userId: Number(userId),
            chatGroupId: Number(chatGroupId),
          },
        },
      });

      // Check if the user role exists and if the user can perform the required action
      if (!userRole || !canPerformAction(userRole.role, requiredRole)) {
        return res.status(403).json({ message: 'Insufficient permissions' });
      }

      next();
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: (error as any).message });
    }
  };
};

/**
 * Utility function to check if a user can perform an action based on their role.
 *
 * @param {ChatRole} userRole - The role of the user.
 * @param {ChatRole} requiredRole - The minimum role required for the action.
 * @returns {boolean} - True if the user has sufficient permissions, false otherwise.
 */
function canPerformAction(userRole: ChatRole, requiredRole: ChatRole): boolean {
  const rolesHierarchy = {
    [ChatRole.USER]: 1,
    [ChatRole.MODERATOR]: 2,
    [ChatRole.ADMIN]: 3,
    [ChatRole.OWNER]: 4,
  };

  return rolesHierarchy[userRole] >= rolesHierarchy[requiredRole];
}
