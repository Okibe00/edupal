import { Router } from 'express';
import adminController from './admin.controller.js';
import { validateRequestData } from '../../common/middleware/validationRequestPayload.middleware.js';
import { createAdminSchema } from './schema/adminSignup.schema.js';
import { roleGuard } from '../../common/middleware/roleguard.middleware.js';
import { CreateSchoolSchema } from './schema/createSchool.schema.js';
import { createClassSchema } from './schema/createClass.schema.js';
import { createSubjectSchema } from './schema/createSubject.schema.js';
import { createTeacherSchema } from './schema/createTeacher.schema.js';
import { schoolGuard } from '../../common/middleware/schoolguard.middleware.js';
import { teachingAssignmentSchema } from './schema/teachingAssignment.schema.js';
import { upload } from '../../common/middleware/upload.middleware.js';
import { SchoolStateSchema } from './schema/schoolState.schema.js';

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
  roleGuard('SCHOOL_ADMIN'),
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
  roleGuard('SCHOOL_ADMIN'),
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
  roleGuard('SCHOOL_ADMIN'),
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
  roleGuard('SCHOOL_ADMIN'),
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
  roleGuard('SCHOOL_ADMIN'),
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
  roleGuard('SCHOOL_ADMIN'),
  schoolGuard,
  upload.single('parent'),
  adminController.uploadParent
);

/**
 * @swagger
 * /api/v1/admin/parent/register:
 *   post:
 *     summary: Register parent and child
 *     tags:
 *       - Admin
 *     requestBody:
 *       $ref: '#/components/schemas/RegisterParentRequest'
 *     responses:
 *       201:
 *         description: Parent registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Parent or admission number already exists
 *       500:
 *         description: Internal server error
 */
route.post(
  '/admin/parent/register',
  roleGuard('SCHOOL_ADMIN'),
  schoolGuard,
  adminController.registerParent
);

/**
 * @swagger
 * /api/v1/admin/user:
 *   get:
 *     summary: Fetch all users in a school
 *     tags:
 *       - Admin
 *     parameters:
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: number
 *         description: The page number to fetch records from
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: number
 *         description: The number of records to retrieve at a time
 *         example: 10
 *
 *     responses:
 *       200:
 *         description: successful!
 *       400:
 *         description: Request failed
 */
route.get(
  '/admin/user',
  roleGuard('SCHOOL_ADMIN'),
  schoolGuard,
  adminController.fetchAll
);

/**
 * @swagger
 * /api/v1/admin/user:
 *   delete:
 *     summary: Deletes a user from a school.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 descripton: 'The users email'
 *                 example: Anu@edupal.ng
 *     responses:
 *       200:
 *         description: successful!
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal  Server Error
 */
route.delete(
  '/admin/user',
  roleGuard('SCHOOL_ADMIN'),
  schoolGuard,
  adminController.delete
);

/**
 * @swagger
 * /api/v1/admin/school-state:
 *   post:
 *     summary: Create or updates a school state.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - week
 *               - term
 *             properties:
 *               week:
 *                 type: number
 *                 descripton: 'The school week'
 *                 example: 1
 *               term:
 *                 type: string
 *                 descripton: 'The school term'
 *                 example: First Term
 *     responses:
 *       200:
 *         description: successful!
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal  Server Error
 */
route.post(
  '/admin/school-state',
  roleGuard('SCHOOL_ADMIN'),
  schoolGuard,
  validateRequestData(SchoolStateSchema, 'body'),
  adminController.schoolState
);

/**
 * @swagger
 * /api/v1/admin/parent/register/child:
 *   post:
 *     summary: Create a child record
 *     description: Creates a child and links the child to a parent using the parent's email address.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - parent_email
 *               - child_name
 *               - child_class
 *               - admission_number
 *             properties:
 *               parent_email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@gmail.com
 *               child_name:
 *                 type: string
 *                 example: Jane Doe
 *               child_class:
 *                 type: string
 *                 example: Primary 5
 *               admission_number:
 *                 type: string
 *                 example: ADM-2026-001
 *     responses:
 *       201:
 *         description: Child created successfully
 *       400:
 *         description: Invalid request body
 *       404:
 *         description: Parent not found
 *       500:
 *         description: Internal server error
 */
route.post(
  '/admin/parent/register/child',
  roleGuard('SCHOOL_ADMIN'),
  schoolGuard,
  adminController.linkChild
);

export default route;
