import {
  PrismaClient,
  LessonGuide,
  LessonAttachment,
  DocumentStatus,
} from '../../../generated/prisma/client.js';
import emailService, {
  EmailService,
} from '../../common/service/email.service.js';
import { AppError } from '../../common/utils/customError.js';
import { prisma } from '../../config/database.js';
import notificationService from '../notification/notification.service.js';
import userService, { UserService } from '../user/user.service.js';
import { LearningContentType } from './schema/learningContent.schema.js';

export class TeacherService {
  constructor(
    private readonly prismaDbClient: PrismaClient,
    userService: UserService,
    private readonly emailService: EmailService
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
  private async prepareParentAlertEmail(
    subjectId: string,
    lessonDetails: {
      weekTitle: number;
      contentTitle: string;
      teacherName: string;
    }
  ) {
    const result = await this.prismaDbClient.subject.findUnique({
      where: { id: subjectId },
      select: {
        id: true,
        class: {
          select: {
            id: true,
            name: true,
            children: {
              select: {
                parentLinks: {
                  select: {
                    parent: {
                      select: {
                        user: {
                          select: {
                            email: true,
                            name: true,
                            parentProfile: { select: { id: true } },
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
    });
    const className = result?.class.name;
    return result?.class.children
      .map((val) => {
        return val.parentLinks.map((x) => {
          return {
            email: x.parent.user.email,
            parentName: x.parent.user.name,
            parentProfileId: x.parent.user.parentProfile?.id,
            className,
            lessonDetails,
          };
        });
      })
      .flat();
  }
  async createLessonGuide(data: LearningContentType, userId: string) {
    const teacherAssignment = await this.prismaDbClient.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
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
    const createdLessonGuide = await this.prismaDbClient.lessonGuide.upsert({
      where: {
        subjectId_week: {
          week: data.week,
          subjectId: data.subjectId,
        },
      },
      update: {},
      create: { ...data },
    });
    //This will be running in a background worker.
    const emailLog = await this.prismaDbClient.emailLog.findUnique({
      where: {
        subjectId_lessonId_week: {
          subjectId: data.subjectId,
          week: data.week,
          lessonId: createdLessonGuide.id,
        },
      },
    });
    if (data.status === DocumentStatus.PUBLISHED && !emailLog) {
      await this.prismaDbClient.emailLog.create({
        data: {
          subjectId: data.subjectId,
          week: data.week,
          lessonId: createdLessonGuide.id,
        },
      });
      const lessonDetailsForParent = {
        weekTitle: data.week,
        contentTitle: data.topic,
        teacherName: teacherAssignment?.name!,
      };
      const parentEmailList = await this.prepareParentAlertEmail(
        data.subjectId,
        lessonDetailsForParent
      );
      await notificationService.createNewContentNotification(parentEmailList!)
      await this.emailService.sendBulkParentEmail(parentEmailList!);
      return createdLessonGuide;
    }
    return createdLessonGuide;
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
