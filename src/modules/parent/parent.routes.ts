import { Router } from 'express';
import parentController from './parent.controller.js';
import { roleGuard } from '../../common/middleware/roleguard.middleware.js';
import {
  parentSchoolGuard,
  schoolGuard,
} from '../../common/middleware/schoolguard.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/parent:
 *   get:
 *     summary: Fetch a parent
 *     description: Fetch a parent with all children.
 *     tags:
 *       - Parent
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */
router.get(
  '/parent',
  roleGuard('PARENT'),
  parentSchoolGuard,
  parentController.fetchParent
);

/**
 * @swagger
 * /api/v1/parent/child/lesson-guide:
 *   get:
 *     summary: Fetch lesson guides for a child
 *     description: Retrieve lesson guides and learning activities assigned to a specific child.
 *     tags:
 *       - Parent
 *     parameters:
 *       - in: query
 *         name: childId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 8be4df61-93ca-11d2-aa0d-00e098032b8c
 *         description: Unique identifier of the child.
 *     responses:
 *       200:
 *         description: Leson guide retrieved successfully!
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 */
router.get(
  '/parent/child/lesson-guide',
  roleGuard('PARENT'),
  parentSchoolGuard,
  parentController.fetchChildLessonGuides
);

/**
 * @swagger
 * /api/v1/parent/streak:
 *   get:
 *     summary: Record patient streak
 *     description: The route updates a users streak
 *     tags:
 *       - Parent
 *     responses:
 *       200:
 *         description: Streak recorded.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 */
router.get(
  '/parent/streak',
  roleGuard('PARENT'),
  parentController.streakManagement
);

/**
 * @swagger
 * /api/v1/parent/point-management:
 *   get:
 *     summary: Record parent points
 *     description: The route updates a parents point
 *     tags:
 *       - Parent
 *     parameters:
 *       - in: query
 *         name: lessonId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         example: 8be4df61-93ca-11d2-aa0d-00e098032b8c
 *         description: Unique identifier of the lessonId.
 *     responses:
 *       200:
 *         description: point recorded.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 */
router.get(
  '/parent/point-management',
  roleGuard('PARENT'),
  parentController.pointManagement
);

/**
 * @swagger
 * /api/v1/parent/learning-content:
 *   get:
 *     summary: Fetch uploaded learning content
 *     description: Fetch learning content stored on the host disk.
 *     tags:
 *       - Parent
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         description: Location of the file on disk.
 *         schema:
 *           type: string
 *           example: /upload/noun.pdf
 *     responses:
 *       200:
 *         description: Learning content fetched successfully
 *       400:
 *         description: Invalid request
 *       404:
 *         description: File not found
 *       500:
 *         description: Internal server error
 */
router.get(
  '/parent/learning-content',
  roleGuard('PARENT'),
  parentController.fetchLearningContent
);
export default router;
