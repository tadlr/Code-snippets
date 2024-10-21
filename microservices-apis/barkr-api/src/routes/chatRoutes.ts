import express, { Router, Request, Response } from 'express';
import {
  sendChat,
  getChatsByGroup,
  deleteChat,
  createChatGroup,
  joinChatGroup,
  leaveChatGroup,
  updateChatGroup,
  deleteChatGroup,
  updateChat,
} from '../controllers/chatController';
import authMiddleware from '../middleware/authMiddleware';
import checkOwnership from '../middleware/checkOwnership';

const router: Router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Chat
 *   description: Chat management
 */

/**
 * @swagger
 * /chat-group:
 *   post:
 *     summary: Create a new chat group
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isGroup:
 *                 type: boolean
 *               participants:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       201:
 *         description: Chat group created successfully
 *       500:
 *         description: Server error
 */

/**
 * Route to create a new chat group.
 *
 * @route POST /chat-group
 * @group Chat - Chat management
 */
router.post('/chat-group', authMiddleware, createChatGroup);

/**
 * @swagger
 * /chat-group/{id}:
 *   put:
 *     summary: Update an existing chat group
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the chat group to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isGroup:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Chat group updated successfully
 *       404:
 *         description: Chat group not found
 *       500:
 *         description: Server error
 */

/**
 * Route to update an existing chat group.
 *
 * @route PUT /chat-group/{id}
 * @group Chat - Chat management
 */
router.put('/chat-group/:id', authMiddleware, checkOwnership('chatGroup', 'id'), updateChatGroup);

/**
 * @swagger
 * /chat-group/{id}:
 *   delete:
 *     summary: Delete a chat group
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the chat group to delete
 *     responses:
 *       204:
 *         description: Chat group deleted successfully
 *       404:
 *         description: Chat group not found
 *       500:
 *         description: Server error
 */

/**
 * Route to delete a chat group.
 *
 * @route DELETE /chat-group/{id}
 * @group Chat - Chat management
 */
router.delete(
  '/chat-group/:id',
  authMiddleware,
  checkOwnership('chatGroup', 'id'),
  deleteChatGroup
);

/**
 * @swagger
 * /chat-group/join:
 *   post:
 *     summary: Join a chat group
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatGroupId:
 *                 type: number
 *               userId:
 *                 type: number
 *     responses:
 *       200:
 *         description: Joined the chat group successfully
 *       500:
 *         description: Server error
 */

/**
 * Route to join a chat group.
 *
 * @route POST /chat-group/join
 * @group Chat - Chat management
 */
router.post('/chat-group/join', authMiddleware, joinChatGroup);

/**
 * @swagger
 * /chat-group/leave:
 *   post:
 *     summary: Leave a chat group
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatGroupId:
 *                 type: number
 *               userId:
 *                 type: number
 *     responses:
 *       204:
 *         description: Left the chat group successfully
 *       500:
 *         description: Server error
 */

/**
 * Route to leave a chat group.
 *
 * @route POST /chat-group/leave
 * @group Chat - Chat management
 */
router.post('/chat-group/leave', authMiddleware, leaveChatGroup);

/**
 * @swagger
 * /chat/{chatGroupId}:
 *   get:
 *     summary: Get chats by chat group ID
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     parameters:
 *       - in: path
 *         name: chatGroupId
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the chat group to fetch chats for
 *     responses:
 *       200:
 *         description: List of chats for the group
 *       404:
 *         description: No chats found
 *       500:
 *         description: Server error
 */

/**
 * Route to get chats by chat group ID.
 *
 * @route GET /chat/{chatGroupId}
 * @group Chat - Chat management
 */
router.get('/chat/:chatGroupId', authMiddleware, getChatsByGroup);

/**
 * @swagger
 * /chat:
 *   post:
 *     summary: Send a message in a chat group
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               chatGroupId:
 *                 type: number
 *               senderId:
 *                 type: number
 *               stickerId:
 *                 type: number
 *               media:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [IMAGE, VIDEO, AUDIO, FILE]
 *     responses:
 *       201:
 *         description: Chat message sent successfully
 *       500:
 *         description: Server error
 */

/**
 * Route to send a chat message.
 *
 * @route POST /chat
 * @group Chat - Chat management
 */
router.post('/chat', authMiddleware, sendChat);

/**
 * @swagger
 * /chat/{id}:
 *   delete:
 *     summary: Delete a chat message
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the chat message to delete
 *     responses:
 *       204:
 *         description: Chat message deleted successfully
 *       404:
 *         description: Chat message not found
 *       500:
 *         description: Server error
 */

/**
 * Route to delete a chat message.
 *
 * @route DELETE /chat/{id}
 * @group Chat - Chat management
 */
router.delete('/chat/:id', authMiddleware, checkOwnership('chatMessage', 'senderId'), deleteChat);

/**
 * @swagger
 * /chat/{id}:
 *   put:
 *     summary: Update a chat message
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: [] # Requires JWT token for this endpoint
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: The ID of the chat message to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *               stickerId:
 *                 type: number
 *               media:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                     type:
 *                       type: string
 *                       enum: [IMAGE, VIDEO, AUDIO, FILE]
 *     responses:
 *       200:
 *         description: Chat message updated successfully
 *       404:
 *         description: Chat message not found
 *       500:
 *         description: Server error
 */

/**
 * Route to update a chat message.
 *
 * @route PUT /chat/{id}
 * @group Chat - Chat management
 */
router.put('/chat/:id', authMiddleware, checkOwnership('chatMessage', 'senderId'), updateChat);

export default router;
