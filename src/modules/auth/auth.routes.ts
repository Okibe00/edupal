import { Router } from 'express';
import authController from './auth.controller.js';

const route = Router();

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     summary: Creates a user
 *     description: Creates a user and returns access and refresh tokens
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signupSchema'
 *     responses:
 *       200:
 *         description: success
 *       404:
 *         $ref: '#/components/responses/NotFoundErrorResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationErrorResponse'
 *       500:
 *         $ref: '#/components/responses/GenericErrorResponse'
 */
route.post('/auth/signup', authController.signUp);
/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    Summary: Login a user
 *    description: Creates a user and returns access and refresh tokens
 *    tags:
 *      - Auth
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/loginSchema'
 *    responses:
 *      200:
 *        description: success
 *      404:
 *        description: User not found
 *      500:
 *        description: Server error
 */
route.post('/auth/login', authController.login);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *  get:
 *    Summary: Creates a user
 *    description: Creates a user and returns access and refresh tokens
 *    tags:
 *      - Auth
 *    parameters:
 *     - $ref: "#/components/parameters/refreshParam"
 *    responses:
 *      200:
 *        description: success
 *      404:
 *        description: User not found
 *      500:
 *        description: Server error
 */
route.get('/auth/refresh', authController.refresh);

export default route;
