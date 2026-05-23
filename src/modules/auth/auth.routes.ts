import { Router } from 'express';
import authController from './auth.controller.js';
import { validateRequestData } from '../../common/middleware/validationRequestPayload.middleware.js';
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from './dto/auth.dto.js';

const route = Router();

/**
 *
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
// route.post(
//   '/auth/signup',
//   validateRequestData(signupSchema, 'body'),
//   authController.signUp
// );
/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: Login a user
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
route.post(
  '/auth/login',
  validateRequestData(loginSchema, 'body'),
  authController.login
);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *  get:
 *    summary: Creates a new access token.
 *    description: Creates a new access and refresh tokens.
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

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Send a password reset token to user email
 *     description: Creates and sends a password reset token to the user-defined email address.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: okibeogomola@gmail.com
 *                 format: email
 *     responses:
 *       200:
 *         description: Success
 */
route.post(
  '/auth/forgot-password',
  validateRequestData(forgotPasswordSchema, 'body'),
  authController.forgotPassword
);
/**
 * @swagger
 * /api/v1/auth/reset-password:
 *   post:
 *     summary: Reset user password.
 *     description: Reset a users password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: superStrongPassword123
 *               resetToken:
 *                 type: string
 *                 example: hdddskssfjsnlfsksflskhfkdfnsdfhkfniuwekfbkdfmnfwbjk
 *     responses:
 *       200:
 *         description: Success
 */
route.post(
  '/auth/reset-password',
  validateRequestData(resetPasswordSchema, 'body'),
  authController.resetPassword
);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   get:
 *     summary: logout a user password.
 *     description: logout a user from the app.
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Success
 */
route.get('/auth/logout', authController.logout);

export default route;
