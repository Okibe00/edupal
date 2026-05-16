export const CreateSchoolRequest = {
  type: 'object',
  required: ['name'],
  properties: {
    name: {
      type: 'string',
      minLength: 5,
      maxLength: 100,
      example: 'Greenfield Academy',
    },
    subdomain: {
      type: 'string',
      minLength: 3,
      maxLength: 50,
      pattern: '^[a-z0-9-]+$',
      example: 'greenfield',
      nullable: true,
    },
    brandColor: {
      type: 'string',
      pattern: '^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$',
      example: '#1a73e8',
      nullable: true,
    },
    type: {
      type: 'string',
      example: 'Secondary',
      nullable: true,
    },
    street: {
      type: 'string',
      example: '12 Allen Avenue',
      nullable: true,
    },
    city: {
      type: 'string',
      example: 'Ikeja',
      nullable: true,
    },
    state: {
      type: 'string',
      example: 'Lagos',
      nullable: true,
    },
    tel: {
      type: 'string',
      pattern: '^\\+?[0-9]{10,15}$',
      example: '+2348012345678',
      nullable: true,
    },
  },
};
export const CreateClassRequest = {
  type: 'object',
  properties: {
    yearGroup: {
      type: 'number',
      example: 5,
    },
    name: {
      type: 'string',
      example: 'Primary 2',
    },
  },
};

export const CreateSubjectRequest = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'Civic Education',
    },
    classId: {
      type: 'string',
      format: 'uuid',
      example: '69f71285-dd20-83ea-a91c-b3f98c649249',
    },
  },
};

export const AssignTeacherRequest = {
  type: 'object',
  properties: {
    classId: {
      type: 'string',
      format: 'uuid',
      example: '69f71285-dd20-83ea-a91c-b3f98c649249',
    },
    teacherId: {
      type: 'string',
      format: 'uuid',
      example: '69f71285-dd20-83ea-a91c-b3f98c649249',
    },
    subjectId: {
      type: 'string',
      format: 'uuid',
      example: '69f71285-dd20-83ea-a91c-b3f98c649249',
    },
  },
};
export const CreateLessonGuideRequest = {
  description: 'Create lesson guide request body',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'object',
        required: ['status', 'week', 'subjectId', 'topic'],
        properties: {
          status: {
            type: 'string',
            enum: ['DRAFT', 'ARCHIVED', 'PUBLISHED'],
            example: 'DRAFT',
          },
          week: {
            type: 'number',
            example: 3,
          },
          subjectId: {
            type: 'string',
            format: 'uuid',
            example: '550e8400-e29b-41d4-a716-446655440000',
          },
          topic: {
            type: 'string',
            example: 'Introduction to Algebra',
          },
          learningObjectives: {
            type: 'string',
            example: 'Students should understand basic algebraic expressions.',
          },
          learningContent: {
            type: 'string',
            example:
              'Algebra is a branch of mathematics dealing with symbols and rules for manipulating those symbols.',
          },
          // file: {
          //   type: 'string',
          //   format: 'binary',
          //   description:
          //     'Upload lesson guide attachment (PDF, image, audio, etc.)',
          // },
        },
      },
    },
  },
};
export const CreateLessonAttachmentRequest = {
  description: 'Upload lesson guide attachment request body',
  required: true,
  content: {
    'multipart/form-data': {
      schema: {
        type: 'object',
        required: ['lessonId', 'file'],
        properties: {
          lessonId: {
            type: 'string',
            format: 'uuid',
            example: '550e8400-e29b-41d4-a716-446655440000',
          },
          file: {
            type: 'string',
            format: 'binary',
            description: 'Upload lesson guide attachment (image - Max 50MB)',
          },
        },
      },
    },
  },
};

export const RegisterParentRequest = {
  description: 'Register multiple parent and child records',
  required: true,
  content: {
    'application/json': {
      schema: {
        type: 'array',
        items: {
          type: 'object',
          required: [
            'parent_name',
            'parent_phone',
            'parent_email',
            'child_name',
            'child_class',
            'admission_number',
          ],
          properties: {
            parent_name: {
              type: 'string',
              example: 'John Doe',
            },
            parent_phone: {
              type: 'string',
              example: '+2348012345678',
            },
            parent_email: {
              type: 'string',
              format: 'email',
              example: 'johndoe@gmail.com',
            },
            child_name: {
              type: 'string',
              example: 'Jane Doe',
            },
            child_class: {
              type: 'string',
              example: 'Primary 5',
            },
            admission_number: {
              type: 'string',
              example: 'ADM-2026-001',
            },
          },
        },
      },
    },
  },
};
