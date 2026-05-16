import { Router } from 'express';
import { authGuard } from '../../common/middleware/authguard.middleware.js';
import parentController from './parent.controller.js';
import { roleGuard } from '../../common/middleware/roleguard.middleware.js';

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
  authGuard,
  roleGuard('PARENT'),
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
 *         $ref: '#/components/responses/ParentChildLessonGuideResponse'
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
  authGuard,
  roleGuard('PARENT'),
  parentController.fetchChildLessonGuides
);
export default router;
