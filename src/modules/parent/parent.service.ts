import { PrismaClient } from '../../../generated/prisma/client.js';
import emailService, {
  EmailService,
} from '../../common/service/email.service.js';
import { prisma } from '../../config/database.js';
import userService, { UserService } from '../user/user.service.js';
import { LearningContentType } from './schema/learningContent.schema.js';

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
    return await this.prismaDbClient.child.findUniqueOrThrow({
      where: { id: childId },
      select: {
        class: {
          select: {
            subjects: {
              select: {
                name: true,
                lessonGuides: {
                  where: { week: schoolState?.week! },
                },
              },
            },
          },
        },
      },
    });
  }
}
export default new ParentService(prisma, userService, emailService);
