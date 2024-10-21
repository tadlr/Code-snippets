import express, { Router } from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
} from '../controllers/postController';
import authMiddleware from '../middleware/authMiddleware';
import checkOwnership from '../middleware/checkOwnership';
import checkBlocked from '../middleware/checkBlocked';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Post management
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               nsfw:
 *                 type: boolean
 *               isPrivate:
 *                 type: boolean
 *               authorId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Post created successfully
 *       500:
 *         description: Server error
 */
/**
 * Route to create a new post.
 * The user must be authenticated and not blocked.
 * @route POST /posts
 */
router.post('/', authMiddleware, checkBlocked, createPost);

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: nsfw
 *         schema:
 *           type: boolean
 *         description: Filter by NSFW posts
 *       - in: query
 *         name: isPrivate
 *         schema:
 *           type: boolean
 *         description: Filter by private posts
 *     responses:
 *       200:
 *         description: List of posts retrieved successfully
 *       500:
 *         description: Server error
 */
/**
 * Route to get all posts with optional filters (NSFW, private).
 * @route GET /posts
 */
router.get('/', authMiddleware, getAllPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a single post by ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to retrieve
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
/**
 * Route to get a single post by ID.
 * @route GET /posts/{id}
 * @param {string} req.params.id - The ID of the post to retrieve
 */
router.get('/:id', authMiddleware, getPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update an existing post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               nsfw:
 *                 type: boolean
 *               isPrivate:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
/**
 * Route to update an existing post.
 * The user must be authenticated and the owner of the post.
 * @route PUT /posts/{id}
 * @param {string} req.params.id - The ID of the post to update
 */
router.put('/:id', authMiddleware, checkOwnership('post', 'authorId'), updatePost);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete an existing post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to delete
 *     responses:
 *       204:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
/**
 * Route to delete an existing post.
 * The user must be authenticated and the owner of the post.
 * @route DELETE /posts/{id}
 * @param {string} req.params.id - The ID of the post to delete
 */
router.delete('/:id', authMiddleware, checkOwnership('post', 'authorId'), deletePost);

export default router;
