import {
  PrismaClient,
  LessonGuide,
  LessonAttachment,
} from '../../../generated/prisma/client.js';
import emailService, {
  EmailService,
} from '../../common/service/email.service.js';
import { AppError } from '../../common/utils/customError.js';
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
            school: {
              select: {
                name: true,
                id: true,
              },
            },
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

  async createLessonGuide(data: LearningContentType, userId: string) {
    const teacherAssignment = await this.prismaDbClient.user.findUnique({
      where: { id: userId },
      select: {
        teacherProfile: {
          select: {
            teachingAssignments: {
              where: { subjectId: data.subjectId },
            },
          },
        },
      },
    });
    if (teacherAssignment?.teacherProfile?.teachingAssignments.length === 0) {
      throw new AppError(
        'The subject is not assigned to this teacher or does not exist contact school admin',
        400,
        'NONSTD_TEACHER_NOT_ASSIGNED_SUBJECT'
      );
    }
    return this.prismaDbClient.lessonGuide.upsert({
      where: {
        subjectId_week: {
          week: data.week,
          subjectId: data.subjectId,
        },
      },
      update: {},
      create: { ...data },
    });
  }
  async createLessonAttachment(
    lessonId: string,
    attachmentUrl: string
  ): Promise<LessonAttachment> {
    return await this.prismaDbClient.lessonAttachment.create({
      data: {
        url: attachmentUrl,
        LessonGuide: {
          connect: {
            id: lessonId,
          },
        },
      },
    });
  }
  async fetchLessionGuide(userId: string) {
    return this.prismaDbClient.user.findFirst({
      where: { id: userId },
      select: {
        teacherProfile: {
          select: {
            teachingAssignments: {
              select: {
                subject: {
                  select: {
                    name: true,
                    lessonGuides: { include: { attachments: true } },
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  async getLessionById(lessionId: string): Promise<LessonGuide | null> {
    return await this.prismaDbClient.lessonGuide.findUnique({
      where: {
        id: lessionId,
      },
      include: {
        attachments: true,
      },
    });
  }
}

export default new TeacherService(prisma, userService, emailService);
