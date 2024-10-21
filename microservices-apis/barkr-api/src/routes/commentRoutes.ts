import express, { Router, Request, Response } from 'express';
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost,
} from '../controllers/commentController';
import authMiddleware from '../middleware/authMiddleware';
import checkOwnership from '../middleware/checkOwnership';
import checkBlocked from '../middleware/checkBlocked';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment management
 */

/**
 * @swagger
 * /comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               postId:
 *                 type: number
 *               authorId:
 *                 type: number
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       500:
 *         description: Server error
 */

/**
 * Route to create a new comment.
 *
 * This route allows users to create a new comment on a specific post. The user must be authenticated and not blocked.
 *
 * @route POST /comments
 * @group Comments - Comment management
 * @param {Request} req - The Express request object containing the comment data.
 * @param {Response} res - The Express response object.
 * @returns {void}
 * @example
 * // Example request payload
 * {
 *   "content": "Great post!",
 *   "postId": 123,
 *   "authorId": 456
 * }
 */
router.post('/', authMiddleware, checkBlocked, (req: Request, res: Response) => {
  createComment(req, res);
});

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     summary: Update an existing comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

/**
 * Route to update an existing comment.
 *
 * This route allows users to update the content of an existing comment by specifying the comment ID. The user must be authenticated and the owner of the comment.
 *
 * @route PUT /comments/{id}
 * @group Comments - Comment management
 * @param {Request} req - The Express request object containing the comment data.
 * @param {Response} res - The Express response object.
 * @returns {void}
 * @example
 * // Example request URL and payload
 * PUT /comments/123
 * {
 *   "content": "Updated comment text"
 * }
 */
router.put(
  '/:id',
  authMiddleware,
  checkOwnership('comment', 'authorId'),
  (req: Request, res: Response) => {
    updateComment(req, res);
  }
);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     summary: Delete an existing comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the comment to delete
 *     responses:
 *       204:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

/**
 * Route to delete an existing comment.
 *
 * This route allows users to delete a comment by specifying the comment ID. The user must be authenticated and the owner of the comment.
 *
 * @route DELETE /comments/{id}
 * @group Comments - Comment management
 * @param {Request} req - The Express request object containing the comment ID.
 * @param {Response} res - The Express response object.
 * @returns {void}
 * @example
 * // Example request URL
 * DELETE /comments/123
 */
router.delete(
  '/:id',
  authMiddleware,
  checkOwnership('comment', 'authorId'),
  (req: Request, res: Response) => {
    deleteComment(req, res);
  }
);

/**
 * @swagger
 * /comments/post/{postId}:
 *   get:
 *     summary: Get comments by post ID
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the post to fetch comments for
 *     responses:
 *       200:
 *         description: List of comments for the post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

/**
 * Route to get comments by post ID.
 *
 * This route retrieves all comments associated with a specific post, identified by the post ID.
 *
 * @route GET /comments/post/{postId}
 * @group Comments - Comment management
 * @param {Request} req - The Express request object with the post ID as a parameter.
 * @param {Response} res - The Express response object.
 * @returns {void}
 * @example
 * // Example request URL
 * GET /comments/post/123
 */
router.get('/post/:postId', (req: Request, res: Response) => {
  getCommentsByPost(req, res);
});

export default router;
