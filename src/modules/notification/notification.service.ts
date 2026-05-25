import {
  NotificationType,
  PrismaClient,
} from '../../../generated/prisma/client.js';
import { prisma } from '../../config/database.js';

export interface ParentData {
  email: string;
  parentName: string;
  parentProfileId: string | undefined;
  className: string | undefined;
  lessonDetails: {
    weekTitle: number;
    contentTitle: string;
    teacherName: string;
  };
}

export interface NotificationDto {
  type: NotificationType;
  title: string;
  message: string;
  profileId: string;
}
export class NotificationService {
  constructor(private readonly prismaDbClient: PrismaClient) {}
  async createNewContentNotification(data: ParentData[]) {
    const notifications = data.map((value) => {
      return {
        type: NotificationType.LESSON_CONTENT_ALERT,
        title: value.lessonDetails.contentTitle,
        message: `A new learning content for this week has been published by ${value.lessonDetails.teacherName}`,
        parentId: value.parentProfileId!,
      };
    });
    await this.prismaDbClient.notification.createMany({ data: notifications });
  }
  async fetchNotification(userId: string) {
    const [notifications, total] = await this.prismaDbClient.$transaction([
      this.prismaDbClient.notification.findMany({
        where: {
          parent: {
            userId,
          },
          isRead: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prismaDbClient.notification.count({
        where: {
          parent: {
            userId,
          },
          isRead: false,
        },
      }),
    ]);
    return {
      notifications,
      total,
    };
  }
  async markAsRead(id: string) {
    return await this.prismaDbClient.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });
  }
}

export default new NotificationService(prisma);
