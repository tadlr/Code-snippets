import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Joi from 'joi';

const prisma = new PrismaClient();

// Define validation schema for comment creation
const createCommentSchema = Joi.object({
  content: Joi.string().min(1).required().messages({
    'string.empty': 'Content is required',
    'string.min': 'Content should have a minimum length of {#limit}',
  }),
  postId: Joi.string().uuid().required().messages({
    'string.base': 'Post ID must be a string',
    'string.empty': 'Post ID is required',
    'string.guid': 'Post ID must be a valid UUID',
  }),
  authorId: Joi.string().uuid().required().messages({
    'string.base': 'Author ID must be a string',
    'string.empty': 'Author ID is required',
    'string.guid': 'Author ID must be a valid UUID',
  }),
});

/**
 * Create a new comment.
 *
 * @param {Request} req - Express request object containing comment data.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the created comment as a JSON response.
 */
export const createComment = async (req: Request, res: Response): Promise<void> => {
  // Validate request body with Joi
  const { error } = createCommentSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { content, postId, authorId } = req.body;

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      },
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

// Update comment schema now expects UUIDs for postId and authorId
const commentSchema = Joi.object({
  content: Joi.string().min(1).required().messages({
    'string.empty': 'Content is required',
    'string.min': 'Content should have a minimum length of {#limit}',
  }),
  postId: Joi.string().uuid().required().messages({
    'string.base': 'Post ID must be a string',
    'string.empty': 'Post ID is required',
    'string.guid': 'Post ID must be a valid UUID',
  }),
  authorId: Joi.string().uuid().required().messages({
    'string.base': 'Author ID must be a string',
    'string.empty': 'Author ID is required',
    'string.guid': 'Author ID must be a valid UUID',
  }),
});

/**
 * Update an existing comment.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const updateComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate request body
  const { error } = commentSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Delete an existing comment.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const deleteComment = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment) {
      res.status(404).json({ message: 'Comment not found' });
      return;
    }

    await prisma.comment.delete({
      where: { id: Number(id) },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Get all comments for a specific post.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>}
 */
export const getCommentsByPost = async (req: Request, res: Response): Promise<void> => {
  const { postId } = req.params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: Number(postId) },
      include: {
        author: true,
      },
    });

    if (!comments || comments.length === 0) {
      res.status(404).json({ message: 'No comments found for this post' });
      return;
    }

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
