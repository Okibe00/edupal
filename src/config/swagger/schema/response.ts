export const GenericErrorResponse = {
  description: 'Unhandled server error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export const UnauthorizedErrorResponse = {
  description: 'Invalid or expired token',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'Error' },
          code: { type: 'string', example: 'INVALID_TOKEN' },
          message: { type: 'string', example: 'Token expired or revoked' },
        },
      },
    },
  },
};

export const NotFoundErrorResponse = {
  description: 'Resource not found',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'Error' },
          code: {
            type: 'string',
            example: 'CONFLICT_PASSWORD_EMAIL_NOT_FOUND',
          },
          message: { type: 'string', example: 'Password or email not found' },
        },
      },
    },
  },
};
export const ConflictErrorResponse = {
  description: 'Resource conflict',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'Error' },
          code: { type: 'string', example: 'CONFLICT_RESOURCE_EXIST' },
          message: { type: 'string', example: 'Resource already exist' },
        },
      },
    },
  },
};

export const ValidationErrorResponse = {
  description: 'Validation error (Zod)',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          status: { type: 'string', example: 'fail' },
          code: { type: 'string', example: 'VALIDATION_ERROR' },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: { type: 'string', example: 'email' },
                message: { type: 'string', example: 'Invalid email' },
              },
            },
          },
        },
      },
    },
  },
};
