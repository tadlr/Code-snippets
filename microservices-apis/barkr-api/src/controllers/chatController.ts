import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Joi from 'joi';

const prisma = new PrismaClient();

// Validation schema for chat message creation
const sendChatSchema = Joi.object({
  content: Joi.string().allow(null, '').min(1).messages({
    'string.empty': 'Content is required',
    'string.min': 'Content should have a minimum length of {#limit}',
  }),
  chatGroupId: Joi.number().integer().required().messages({
    'number.base': 'Chat group ID must be a number',
    'any.required': 'Chat group ID is required',
  }),
  senderId: Joi.number().integer().required().messages({
    'number.base': 'Sender ID must be a number',
    'any.required': 'Sender ID is required',
  }),
  stickerId: Joi.number().integer().optional().messages({
    'number.base': 'Sticker ID must be a number',
  }),
  media: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        type: Joi.string().valid('IMAGE', 'VIDEO', 'AUDIO', 'FILE').required(),
      })
    )
    .optional(),
});

/**
 * Send a new message in a chat.
 *
 * @param {Request} req - Express request object containing chat data.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the created chat message as a JSON response.
 */
export const sendChat = async (req: Request, res: Response): Promise<void> => {
  // Validate request body with Joi
  const { error } = sendChatSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { content, chatGroupId, senderId, stickerId, media } = req.body;

  try {
    const chatMessage = await prisma.chatMessage.create({
      data: {
        content,
        sender: { connect: { id: senderId } },
        chatGroup: { connect: { id: chatGroupId } },
        sticker: stickerId ? { connect: { id: stickerId } } : undefined,
        media: media
          ? {
              create: media.map((m: any) => ({
                url: m.url,
                type: m.type,
              })),
            }
          : undefined,
      },
      include: {
        media: true, // Include media in the response
        sticker: true, // Include sticker in the response
        sender: true, // Include sender in the response
      },
    });

    res.status(201).json(chatMessage);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Get all chats in a chat group by chatGroupId.
 *
 * @param {Request} req - Express request object containing chatGroupId.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the list of chats in the chat group as a JSON response.
 */
export const getChatsByGroup = async (req: Request, res: Response): Promise<void> => {
  const { chatGroupId } = req.params;

  try {
    const chats = await prisma.chatMessage.findMany({
      where: { chatGroupId: Number(chatGroupId) },
      include: {
        sender: true,
        media: true,
        sticker: true,
      },
    });

    if (!chats || chats.length === 0) {
      res.status(404).json({ message: 'No chats found in this group' });
      return;
    }

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Delete a chat message by ID.
 *
 * @param {Request} req - Express request object containing chat message ID.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends a 204 status if the chat message is successfully deleted.
 */
export const deleteChat = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const chatMessage = await prisma.chatMessage.findUnique({
      where: { id: Number(id) },
    });

    if (!chatMessage) {
      res.status(404).json({ message: 'Chat message not found' });
      return;
    }

    await prisma.chatMessage.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Validation schema for chat group creation
const chatGroupSchema = Joi.object({
  name: Joi.string().optional(),
  isGroup: Joi.boolean().default(false),
  participants: Joi.array().items(Joi.number().integer()).required(),
});

/**
 * Create a new chat group.
 *
 * @param {Request} req - Express request object containing group data.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the created chat group as a JSON response.
 */
export const createChatGroup = async (req: Request, res: Response): Promise<void> => {
  const { error } = chatGroupSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { name, isGroup, participants } = req.body;

  try {
    const chatGroup = await prisma.chatGroup.create({
      data: {
        name,
        participants: {
          create: participants.map((userId: number) => ({
            user: { connect: { id: userId } },
          })),
        },
      },
      include: { participants: true },
    });

    res.status(201).json(chatGroup);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Join a chat group.
 *
 * @param {Request} req - Express request object containing user ID and chat group ID.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the updated chat group as a JSON response.
 */
export const joinChatGroup = async (req: Request, res: Response): Promise<void> => {
  const { chatGroupId, userId } = req.body;

  try {
    const chatGroup = await prisma.chatGroup.update({
      where: { id: Number(chatGroupId) },
      data: {
        participants: {
          create: { userId: Number(userId) },
        },
      },
      include: { participants: true },
    });

    res.status(200).json(chatGroup);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Leave a chat group.
 *
 * @param {Request} req - Express request object containing user ID and chat group ID.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends a 204 status if the user leaves successfully.
 */
export const leaveChatGroup = async (req: Request, res: Response): Promise<void> => {
  const { chatGroupId, userId } = req.body;

  try {
    await prisma.userOnChat.delete({
      where: {
        chatGroupId_userId: {
          chatGroupId: Number(chatGroupId),
          userId: Number(userId),
        },
      },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Update a chat group.
 *
 * @param {Request} req - Express request object containing updated group data.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the updated chat group as a JSON response.
 */
export const updateChatGroup = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, isGroup } = req.body;

  try {
    const updatedChatGroup = await prisma.chatGroup.update({
      where: { id: Number(id) },
      data: { name },
    });

    res.status(200).json(updatedChatGroup);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Delete a chat group by ID.
 *
 * @param {Request} req - Express request object containing chat group ID.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends a 204 status if the chat group is successfully deleted.
 */
export const deleteChatGroup = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    await prisma.chatGroup.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Update a chat message.
 *
 * @param {Request} req - Express request object containing updated chat message data.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the updated chat message as a JSON response.
 */
export const updateChat = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { content, media, stickerId } = req.body;

  try {
    const updatedChatMessage = await prisma.chatMessage.update({
      where: { id: Number(id) },
      data: {
        content,
        sticker: stickerId ? { connect: { id: stickerId } } : undefined,
        media: media
          ? {
              deleteMany: {},
              create: media.map((m: any) => ({
                url: m.url,
                type: m.type,
              })),
            }
          : undefined,
      },
      include: {
        media: true,
        sticker: true,
      },
    });

    res.status(200).json(updatedChatMessage);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
