import { Router } from 'express';
import notificationController from './notification.controller.js';
import { authGuard } from '../../common/middleware/authguard.middleware.js';
import { isValidToken } from '../../common/middleware/validToken.middleware.js';
import { roleGuard } from '../../common/middleware/roleguard.middleware.js';

const route = Router();

/**
 * @swagger
 * /api/v1/notification:
 *   get:
 *     summary: Fetch parent notifications
 *     description: Fetch all notifications belonging to a parent user
 *     tags:
 *       - Notification
 *     responses:
 *       200:
 *         description: Notifications fetched successfully
 *       400:
 *         description: Request failed
 */
route.get(
  '/notification',
  authGuard,
  isValidToken,
  roleGuard('PARENT'),
  notificationController.fetchNotification
);

/**
 * @swagger
 * /api/v1/notification/mark-as-read:
 *   get:
 *     summary: Mark a notification as read.
 *     description: Marks a parent notification as read.
 *     tags:
 *       - Notification
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: notification id
 *         example:
 *     responses:
 *       200:
 *         description: successful!
 *       400:
 *         description: Request failed
 */
route.get(
  '/notification/mark-as-read',
  authGuard,
  isValidToken,
  roleGuard('PARENT'),
  notificationController.markAsRead
);
export default route;
