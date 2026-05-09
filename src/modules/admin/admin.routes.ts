import { Router } from 'express';
import adminController from './admin.controller.js';
import { validateRequestData } from '../../common/middleware/validationRequestPayload.middleware.js';
import { createAdminSchema } from './schema/adminSignup.schema.js';
import { authGuard } from '../../common/middleware/authguard.middleware.js';
import { roleGuard } from '../../common/middleware/roleguard.middleware.js';
import { CreateSchoolSchema } from './schema/createSchool.schema.js';
import { createClassSchema } from './schema/createClass.schema.js';
import { createSubjectSchema } from './schema/createSubject.schema.js';
import { createTeacherSchema } from './schema/createTeacher.schema.js';
import { schoolGuard } from '../../common/middleware/schoolguard.middleware.js';
import { teachingAssignmentSchema } from './schema/teachingAssignment.schema.js';
import { upload } from '../../common/middleware/upload.middleware.js';

const route = Router();

/**
 * @swagger
 * /api/v1/admin/signup:
 *   post:
 *     summary: Creates a school administrator user
 *     description: Creates a school administrator user returning an access and refresh token.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signupSchema'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CreateUserResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 */
route.post(
  '/admin/signup',
  validateRequestData(createAdminSchema, 'body'),
  adminController.signup
);

/**
 * @swagger
 * /api/v1/admin/school:
 *   post:
 *     summary: Creates a school
 *     description: Creates a school.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSchoolRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CreateSchoolResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */
route.post(
  '/admin/school',
  authGuard,
  roleGuard,
  schoolGuard,
  validateRequestData(CreateSchoolSchema, 'body'),
  adminController.createSchool
);

/**
 * @swagger
 * /api/v1/admin/class:
 *   post:
 *     summary: Creates a class
 *     description: Creates a school.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateClassRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CreateClassResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */
route.post(
  '/admin/class',
  authGuard,
  roleGuard,
  schoolGuard,
  validateRequestData(createClassSchema, 'body'),
  adminController.createClass
);

/**
 * @swagger
 * /api/v1/admin/subject:
 *   post:
 *     summary: Creates a subject
 *     description: Creates a subject for a class.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSubjectRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CreateSubjectResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */
route.post(
  '/admin/subject',
  authGuard,
  roleGuard,
  schoolGuard,
  validateRequestData(createSubjectSchema, 'body'),
  adminController.createSubject
);

/**
 * @swagger
 * /api/v1/admin/teacher:
 *   post:
 *     summary: Creates a teacher
 *     description: Creates a teacher for a school.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signupSchema'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CreateUserResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */
route.post(
  '/admin/teacher',
  authGuard,
  roleGuard,
  schoolGuard,
  validateRequestData(createTeacherSchema, 'body'),
  adminController.createTeacher
);

/**
 * @swagger
 * /api/v1/admin/assign-teacher:
 *   post:
 *     summary: Assigns a teacher to a class
 *     description: Assigns a teacher to a class.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AssignTeacherRequest'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/CreateTeacherAssignmentResponse'
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 *       401:
 *         $ref: '#/components/responses/UnauthorizedResponse'
 */
route.post(
  '/admin/assign-teacher',
  authGuard,
  roleGuard,
  schoolGuard,
  validateRequestData(teachingAssignmentSchema, 'body'),
  adminController.assignTeacherToClass
);

/**
 * @swagger
 * /api/v1/admin/upload/parent:
 *   post:
 *     summary: Upload a single file
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - parent
 *             properties:
 *               parent:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         $ref: '#/components/responses/ParentUploadSuccessResponse'
 *       400:
 *         description: File upload failed
 */
route.post(
  '/admin/upload/parent',
  authGuard,
  roleGuard,
  schoolGuard,
  upload.single('parent'),
  adminController.uploadParent
);

export default route;
