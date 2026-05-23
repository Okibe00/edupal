import { Router } from 'express';
import teacherController from './teacher.controller.js';
import { upload } from '../../common/middleware/upload.middleware.js';
import { roleGuard } from '../../common/middleware/roleguard.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/teacher:
 *   get:
 *     summary: Fetch a teacher
 *     description: Fetch a teacher with all related records.
 *     tags:
 *       - Teacher
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TeacherProfileResponse'
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
  '/teacher',
  roleGuard('TEACHER'),
  teacherController.fetchTeacher
);

/**
 * @swagger
 * /api/v1/teacher/class:
 *   get:
 *     summary: Fetch a teachers class
 *     description: Fetch a teachers class with subject.
 *     tags:
 *       - Teacher
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TeacherAssignmentsResponse'
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
  '/teacher/class',
  roleGuard('TEACHER'),
  teacherController.fetchTeacherClass
);

/**
 * @swagger
 * /api/v1/teacher/subject:
 *   get:
 *     summary: Fetch a teachers subject.
 *     description: Fetch a teachers subject.
 *     tags:
 *       - Teacher
 *     responses:
 *       200:
 *         $ref: '#/components/responses/TeacherSubjectsResponse'
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
  '/teacher/subject',
  roleGuard('TEACHER'),
  teacherController.fetchTeacherSubject
);

/**
 * @swagger
 * /api/v1/teacher/learning-content:
 *   get:
 *     summary: Fetch uploaded learning content.
 *     description: Fetch learning content on host disk.
 *     tags:
 *       - Teacher
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: location of file on disk.
 *         example: '/upload/noun.pdf'
 *     responses:
 *       200:
 *         description: successful!
 *       400:
 *         description: Request failed
 */
router.get(
  '/teacher/learning-content',
  roleGuard('TEACHER'),
  teacherController.fetchLearningContent
);

/**
 * @swagger
 * /api/v1/teacher/lesson-guide:
 *   post:
 *     summary: Create a lesson guide
 *     tags:
 *       - Teacher
 *     requestBody:
 *       $ref: '#/components/schemas/CreateLessonGuideRequest'
 *     responses:
 *       201:
 *         description: Lesson guide created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post(
  '/teacher/lesson-guide',
  roleGuard('TEACHER'),
  teacherController.createLessonGuide
);

/**
 * @swagger
 * /api/v1/teacher/lesson-guide-attachment:
 *   post:
 *     summary: Upload a lesson guide attachment
 *     tags:
 *       - Teacher
 *     requestBody:
 *       $ref: '#/components/schemas/CreateLessonAttachmentRequest'
 *     responses:
 *       201:
 *         description: Lesson guide created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */

router.post(
  '/teacher/lesson-guide-attachment',
  roleGuard('TEACHER'),
  upload.single('file'),
  teacherController.createLessonAttachment
);

/**
 * @swagger
 * /api/v1/teacher/learner:
 *   get:
 *     summary: Learners in a class.
 *     tags:
 *       - Teacher
 *     responses:
 *       201:
 *         $ref: '#/components/responses/TeacherClassChildrenResponse'
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.get(
  '/teacher/learner',
  roleGuard('TEACHER'),
  teacherController.fetchLearners
);

/**
 * @swagger
 * /api/v1/teacher/lesson-guide:
 *   get:
 *     summary: Teacher Lession guides.
 *     tags:
 *       - Teacher
 *     responses:
 *       201:
 *         description: Successfully fetched the lesson guides
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.get(
  '/teacher/lesson-guide',
  roleGuard('TEACHER'),
  teacherController.fetchLessonGuide
);

/**
 * @swagger
 * /api/v1/teacher/lesson-guide-id :
 *   get:
 *     summary: Fetch lesson guide by ID.
 *     tags:
 *       - Teacher
 *     parameters:
 *      - in: query
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *          description: The lesson guide ID
 *          example: 16514a0a-5928-461a-813c-825ca0c6c0f1
 *     responses:
 *       201:
 *         description: Successfully fetched the lesson guide
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.get(
  '/teacher/lesson-guide-id',
  roleGuard('TEACHER'),
  teacherController.fetchLessonById
);

export default router;
