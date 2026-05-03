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
      example: 'primary 5',
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
