import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import Joi from 'joi';

const prisma = new PrismaClient();

// Define validation schema for post creation and update
const postSchema = Joi.object({
  title: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title should have a minimum length of {#limit}',
    'string.max': 'Title should have a maximum length of {#limit}',
  }),
  imageUrl: Joi.string().uri().required().messages({
    'string.uri': 'Image URL must be a valid URI',
    'string.empty': 'Image URL is required',
  }),
  tags: Joi.array().items(Joi.string()).required().messages({
    'array.base': 'Tags must be an array of strings',
    'any.required': 'Tags are required',
  }),
  nsfw: Joi.boolean().required().messages({
    'boolean.base': 'NSFW must be a boolean',
    'any.required': 'NSFW is required',
  }),
  isPrivate: Joi.boolean().required().messages({
    'boolean.base': 'isPrivate must be a boolean',
    'any.required': 'isPrivate is required',
  }),
  authorId: Joi.number().integer().required().messages({
    'number.base': 'Author ID must be a number',
    'any.required': 'Author ID is required',
  }),
});

/**
 * Create a new post.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the created post as a JSON response.
 */
export const createPost = async (req: Request, res: Response): Promise<void> => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  try {
    const { title, imageUrl, tags, nsfw, isPrivate, authorId } = req.body;

    const post = await prisma.post.create({
      data: {
        title,
        imageUrl,
        tags,
        nsfw,
        isPrivate,
        author: { connect: { id: authorId } },
      },
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Get a single post by ID.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the post data as a JSON response.
 */
export const getPost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
      include: {
        author: true,
        comments: true, // Include comments
      },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Get all posts with optional filtering.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @returns {Promise<void>} - Sends the list of posts as a JSON response.
 */
export const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  const { nsfw, isPrivate } = req.query;

  try {
    const posts = await prisma.post.findMany({
      where: {
        nsfw: nsfw === 'true' ? true : undefined, // Optional filtering based on NSFW
        isPrivate: isPrivate === 'true' ? true : undefined, // Optional filtering based on privacy
      },
      include: {
        author: true,
        comments: true,
      },
    });

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Update an existing post.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {string} req.params.id - The ID of the post to update.
 * @returns {Promise<void>} - Sends the updated post as a JSON response.
 */
export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }

  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const updatedPost = await prisma.post.update({
      where: { id: Number(id) },
      data: req.body,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};

/**
 * Delete an existing post.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {string} req.params.id - The ID of the post to delete.
 * @returns {Promise<void>} - Sends a 204 status if the post is successfully deleted.
 */
export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    await prisma.post.delete({
      where: { id: Number(id) },
    });

    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
