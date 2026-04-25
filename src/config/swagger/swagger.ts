import swaggerJsdoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';
import {
  ValidationErrorResponse,
  ConflictErrorResponse,
  NotFoundErrorResponse,
  UnauthorizedErrorResponse,
  GenericErrorResponse,
} from './schema/response.js';

const responses = {
  ValidationErrorResponse,
  ConflictErrorResponse,
  NotFoundErrorResponse,
  UnauthorizedErrorResponse,
  GenericErrorResponse,
};
const schemas = {
  signupSchema: {
    type: 'object',
    required: ['name', 'email', 'password'],
    properties: {
      name: { type: 'string', example: 'Okibe Onmeje' },
      email: { type: 'string', example: 'okibe@edupal.ng' },
      password: { type: 'string', example: 'superstrongpassword' },
    },
  },

  loginSchema: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', example: 'okibe@edupal.ng' },
      password: { type: 'string', example: 'superstrongpassword' },
    },
  },
};
const refreshParam = {
  name: 'token',
  in: 'query',
  type: 'string',
};

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Edupal',
      version: '1.0.0',
      description: 'API documentation for Edupal backend',
    },
    components: {
      schemas,
      responses,
      parameters: {
        refreshParam,
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
    servers: [
      {
        url: `http://localhost:3400`,
      },
    ],
  },
  apis: ['dist/src/modules/**/*.routes.js', '../modules/**/*.routes.ts'],
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;
