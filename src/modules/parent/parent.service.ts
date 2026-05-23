import {
  DocumentStatus,
  PrismaClient,
} from '../../../generated/prisma/client.js';
import emailService, {
  EmailService,
} from '../../common/service/email.service.js';
import { AppError } from '../../common/utils/customError.js';
import { prisma } from '../../config/database.js';
import userService, { UserService } from '../user/user.service.js';

export class ParentService {
  constructor(
    private readonly prismaDbClient: PrismaClient,
    userService: UserService,
    emailService: EmailService
  ) {}

  async fetchParent(email: string) {
    return await this.prismaDbClient.user.findUniqueOrThrow({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,

        parentProfile: {
          select: {
            school: {
              select: {
                id: true,
                name: true,
              },
            },
            childrenLink: {
              select: {
                child: {
                  select: {
                    id: true,
                    name: true,
                    class: {
                      select: {
                        name: true,
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
  async fetchChildLearningActivity(childId: string, schoolId: string) {
    const schoolState = await this.prismaDbClient.schoolState.findFirst({
      where: { schoolId },
    });
    if (!schoolState) {
      throw new AppError(
        'School or school state does not exist',
        404,
        'NONSTD_SCHOOL_STATE_NOT_FOUND'
      );
    }
    return await this.prismaDbClient.child.findUniqueOrThrow({
      where: { id: childId },
      select: {
        class: {
          select: {
            name: true,
            yearGroup: true,
            subjects: {
              select: {
                name: true,
                lessonGuides: {
                  where: {
                    week: {
                      lte: schoolState.week,
                    },
                    status: DocumentStatus.PUBLISHED,
                  },
                  select: {
                    id: true,
                    week: true,
                    learningObjectives: true,
                    learningContent: true,
                    attachments: true,
                    topic: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  normalizeDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  getDayDifference(date1: Date, date2: Date) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    const d1 = this.normalizeDate(date1);
    const d2 = this.normalizeDate(date2);
    return Math.floor((d2.getTime() - d1.getTime()) / MS_PER_DAY);
  }
  async streakManagement(userId: string) {
    const userProfile = await this.prismaDbClient.user.findUnique({
      where: { id: userId },
      select: {
        parentProfile: {
          select: {
            id: true,
          },
        },
      },
    });
    if (userProfile && userProfile.parentProfile) {
      const userStreakHx = await this.prismaDbClient.streakHistory.findUnique({
        where: {
          parentId: userProfile.parentProfile.id,
        },
      });
      const now = new Date();
      console.log(userStreakHx);
      if (!userStreakHx) {
        return await this.prismaDbClient.streakHistory.create({
          data: {
            lastActivityDate: now,
            currentStreakCount: 1,
            parent: {
              connect: {
                id: userProfile.parentProfile.id,
              },
            },
          },
        });
      }
      const diff = this.getDayDifference(userStreakHx.lastActivityDate!, now);
      if (diff === 0) {
        return userStreakHx;
      }
      if (diff === 1) {
        return await this.prismaDbClient.streakHistory.update({
          where: { id: userStreakHx.id },
          data: {
            lastActivityDate: now,
            currentStreakCount: { increment: 1 },
          },
        });
      }

      const longestStreak = await this.prismaDbClient.longestStreak.findUnique({
        where: { profileId: userStreakHx.parentId },
      });
      if (longestStreak) {
        if (longestStreak.streak < userStreakHx.currentStreakCount) {
          await this.prismaDbClient.longestStreak.update({
            where: {
              id: longestStreak.id,
            },
            data: {
              streak: userStreakHx.currentStreakCount,
            },
          });
        }
      } else {
        await this.prismaDbClient.longestStreak.create({
          data: {
            streak: userStreakHx.currentStreakCount,
            parentProfile: {
              connect: {
                id: userStreakHx.parentId,
              },
            },
          },
        });
      }
      return await this.prismaDbClient.streakHistory.update({
        where: { id: userStreakHx.id },
        data: {
          currentStreakCount: 1,
        },
      });
    }
    throw new AppError('Parent does not  exist', 404, 'NONSTD_USER_NOT_FOUND');
  }
  async pointManagement(parentId: string, lessonId: string) {
    const parentUser = await this.prismaDbClient.user.findUnique({
      where: {
        id: parentId,
      },
      select: {
        parentProfile: {
          select: {
            id: true,
            lessonRead: true,
          },
        },
      },
    });
    console.log(parentUser);
    if (!parentUser) {
      throw new AppError(
        'The user(parent) was not found',
        404,
        'NONSTD_USER_NOT_FOUND'
      );
    }
    if (!parentUser.parentProfile) {
      throw new AppError(
        'Parent profile not found',
        404,
        'NONSTD_PARENT_PROFILE_NOT_FOUND'
      );
    }

    if (
      parentUser.parentProfile.lessonRead &&
      parentUser.parentProfile.lessonRead.lessonIds.includes(lessonId)
    ) {
      return;
    }

    const [lesson, point] = await this.prismaDbClient.$transaction([
      this.prismaDbClient.lessonRead.upsert({
        where: { parentId: parentUser.parentProfile.id },
        update: { lessonIds: { push: lessonId } },
        create: {
          lessonIds: [lessonId],
          parentId: parentUser.parentProfile.id,
        },
      }),
      this.prismaDbClient.streakHistory.update({
        where: { parentId: parentUser.parentProfile.id },
        data: { points: { increment: 1 } },
      }),
    ]);
    return point;
  }
}
export default new ParentService(prisma, userService, emailService);
