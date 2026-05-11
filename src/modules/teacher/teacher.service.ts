import { PrismaClient } from '../../../generated/prisma/client.js';
import emailService, {
  EmailService,
} from '../../common/service/email.service.js';
import { prisma } from '../../config/database.js';
import userService, { UserService } from '../user/user.service.js';
import { LearningContentType } from './schema/learningContent.schema.js';

export class TeacherService {
  constructor(
    private readonly prismaDbClient: PrismaClient,
    userService: UserService,
    emailService: EmailService
  ) {}

  async fetchTeacher(email: string) {
    return await this.prismaDbClient.user.findUniqueOrThrow({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        teacherProfile: {
          select: {
            id: true,
            schoolId: true,
            teachingAssignments: {
              select: {
                class: {
                  select: {
                    id: true,
                    name: true,
                    yearGroup: true,
                  },
                },
                subject: {
                  select: {
                    id: true,
                    name: true,
                    lessonGuides: {
                      orderBy: { createdAt: 'desc' },
                      select: {
                        id: true,
                        learningContent: true,
                        learningObjectives: true,
                        topic: true,
                        week: true,
                        status: true,
                        engagements: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  async fetchTeacherClass(userId: string) {
    return await this.prismaDbClient.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        teacherProfile: {
          select: {
            teachingAssignments: {
              select: {
                class: { select: { id: true, name: true, yearGroup: true } },
                subject: { select: { name: true } },
              },
            },
          },
        },
      },
    });
  }

  async fetchTeacherSubject(userId: string) {
    return await this.prismaDbClient.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        teacherProfile: {
          select: {
            teachingAssignments: {
              select: { subject: { select: { id: true, name: true } } },
            },
          },
        },
      },
    });
  }
  async fetchLearners(userId: string) {
    return await this.prismaDbClient.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        teacherProfile: {
          select: {
            teachingAssignments: {
              select: {
                class: {
                  select: {
                    name: true,
                    children: { select: { id: true, name: true } },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async createLessionGuide(data: LearningContentType, filePath: string) {
    return this.prismaDbClient.lessonGuide.upsert({
      where: {
        subjectId_week: {
          week: data.week,
          subjectId: data.subjectId,
        },
      },
      update: {},
      create: { ...data, learningContent: filePath },
    });
  }
  async fetchLessionGuide(userId: string) {
    return this.prismaDbClient.user.findFirst({
      where: { id: userId },
      include: {
        teacherProfile: {
          include: {
            teachingAssignments: {
              include: { subject: { include: { lessonGuides: true } } },
            },
          },
        },
      },
    });
  }
}

export default new TeacherService(prisma, userService, emailService);
