export const GenericErrorResponse = {
  description: 'Unhandled server error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Teacher assigned successfully',
          },
          error: {
            type: 'object',
            properties: {
              code: {
                type: 'number',
                example: 500,
              },
              message: {
                type: 'string',
                example: 'INTERNAL SERVER ERROR',
              },
            },
          },
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

export const CreateSchoolResponse = {
  description: 'School created successfully',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'School created successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                example: '69f71285-dd20-83ea-a91c-b3f98c649249',
              },
              name: {
                type: 'string',
                example: 'Greenfield Academy',
              },
              type: {
                type: 'string',
                nullable: true,
                example: 'Secondary',
              },
              subdomain: {
                type: 'string',
                example: 'greenfield',
              },
              brandColor: {
                type: 'string',
                nullable: true,
                example: '#1a73e8',
              },
              street: {
                type: 'string',
                nullable: true,
                example: '12 Allen Avenue',
              },
              city: {
                type: 'string',
                nullable: true,
                example: 'Ikeja',
              },
              state: {
                type: 'string',
                nullable: true,
                example: 'Lagos',
              },
              tel: {
                type: 'string',
                nullable: true,
                example: '+2348012345678',
              },
              logo: {
                type: 'string',
                nullable: true,
                example: 'https://example.com/logo.png',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-01T10:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-01T10:00:00.000Z',
              },
            },
          },
        },
      },
    },
  },
};
export const CreateUserResponse = {
  description: 'User created successfully',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'User created successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                forma: 'uuid',
                example: '69f71285-dd20-83ea-a91c-b3f98c649249',
              },
              name: {
                type: 'string',
                example: 'Okibe Onmeje',
              },
              email: {
                type: 'string',
                example: 'admin@example.com',
              },
              roleId: {
                type: 'string',
                format: 'uuid',
                nullable: true,
                example: '69f71285-dd20-83ea-a91c-b3f94533249',
              },
              isVerified: {
                type: 'boolean',
                example: true,
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-01T10:00:00.000Z',
              },
              updateAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-01T10:00:00.000Z',
              },
            },
          },
        },
      },
    },
  },
};

export const CreateClassResponse = {
  description: 'Class created successfully',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Class created successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                example: '69f71285-dd20-83ea-a91c-b3f98c649249',
              },
              name: {
                type: 'string',
                example: 'Primary 5',
              },
              schoolId: {
                type: 'string',
                format: 'uuid',
                example: '69f71285-dd20-83ea-a91c-b3f98c649249',
              },
              yearGroup: {
                type: 'number',
                nullable: true,
                example: 5,
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-03T10:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-03T10:00:00.000Z',
              },
            },
          },
        },
      },
    },
  },
};
export const CreateSubjectResponse = {
  description: 'Subject created successfully',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Subject created successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                example: '69f71285-dd20-83ea-a91c-b3f98c649249',
              },
              name: {
                type: 'string',
                example: 'Mathematics',
              },
              classId: {
                type: 'string',
                format: 'uuid',
                example: '69f71285-dd20-83ea-a91c-b3f98c649249',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-03T10:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-03T10:00:00.000Z',
              },
            },
          },
        },
      },
    },
  },
};

export const CreateTeacherAssignmentResponse = {
  description: 'Teacher assigned successfully',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Teacher assigned successfully',
          },
          data: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                example: '550e8400-e29b-41d4-a716-446655440000',
              },
              classId: {
                type: 'string',
                format: 'uuid',
                example: '550e8400-e453-41d4-a716-446655440000',
              },
              subjectId: {
                type: 'string',
                format: 'uuid',
                example: '550e8400-e29b-45rt-a716-446655440000',
              },
              teacherId: {
                type: 'string',
                format: 'uuid',
                example: '550e8400-e29b-41d4-c345-446655440000',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-03T10:00:00.000Z',
              },
              updatedAt: {
                type: 'string',
                format: 'date-time',
                example: '2026-05-03T10:00:00.000Z',
              },
            },
          },
        },
      },
    },
  },
};

export const UnauthorizedResponse = {
  description: 'Unauthorized - Authentication required or invalid token',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Unauthorized',
          },
          error: {
            type: 'string',
            example: 'Invalid or missing authentication token',
          },
        },
      },
    },
  },
};
export const ParentUploadSuccessResponse = {
  description: 'File upload successfully',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },

          message: {
            type: 'string',
            example: 'File upload successfully',
          },

          data: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: {
                  type: 'string',
                  format: 'uuid',
                  example: '6bf9fc9c-91fc-4579-8b05-898f323b4bae',
                },

                name: {
                  type: 'string',
                  example: 'John Doe',
                },

                email: {
                  type: 'string',
                  format: 'email',
                  example: 'testcyclewise@gmail.com',
                },

                password: {
                  type: 'string',
                  example: '01dd5322fe4aa858',
                },

                roleId: {
                  type: 'string',
                  format: 'uuid',
                  example: 'ad692c08-10ae-4969-acbf-f40b27da684a',
                },

                isVerified: {
                  type: 'boolean',
                  example: false,
                },

                createdAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2026-05-09T06:47:36.335Z',
                },

                updateAt: {
                  type: 'string',
                  format: 'date-time',
                  example: '2026-05-09T06:47:36.335Z',
                },

                parentProfile: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'string',
                      format: 'uuid',
                      example: '1ffb6d09-2cd9-4cfe-acf4-3c863723c57f',
                    },

                    createdAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-05-09T06:47:36.367Z',
                    },

                    updatedAt: {
                      type: 'string',
                      format: 'date-time',
                      example: '2026-05-09T06:47:36.367Z',
                    },

                    phoneNumber: {
                      type: 'string',
                      example: '08012345678',
                    },

                    userId: {
                      type: 'string',
                      format: 'uuid',
                      example: '6bf9fc9c-91fc-4579-8b05-898f323b4bae',
                    },

                    schoolId: {
                      type: 'string',
                      format: 'uuid',
                      example: '7ef3d438-128b-4fa0-85b0-660bf48ad420',
                    },

                    childrenLink: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                            format: 'uuid',
                            example:
                              '38fb905a-c46b-41d7-af39-a9e255e45971',
                          },

                          parentId: {
                            type: 'string',
                            format: 'uuid',
                            example:
                              '1ffb6d09-2cd9-4cfe-acf4-3c863723c57f',
                          },

                          childId: {
                            type: 'string',
                            format: 'uuid',
                            example:
                              'b036016c-5790-4bd6-bbd2-284423dab695',
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};