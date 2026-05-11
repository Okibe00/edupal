import bcrypt from 'bcrypt';
import { prisma } from '../../config/database.js';
import emailService, {
  EmailService,
} from '../../common/service/email.service.js';
import {
  Class,
  PrismaClient,
  School,
  User,
  Subject,
} from '../../../generated/prisma/client.js';
import { createAdminType } from './schema/adminSignup.schema.js';
import { TeachingAssignment } from '../../../generated/prisma/browser.js';
import { createSchoolType } from './schema/createSchool.schema.js';
import { createClassType } from './schema/createClass.schema.js';
import { createTeacherType } from './schema/createTeacher.schema.js';
import { teachingAssignmentType } from './schema/teachingAssignment.schema.js';
import { createSubjectType } from './schema/createSubject.schema.js';
import { GroupedRecord } from '../../common/utils/groupParent.js';
import userService from '../user/user.service.js';

class AdminService {
  constructor(
    private readonly prismaDBClient: PrismaClient,
    private readonly emailService: EmailService
  ) {}
  async signup(data: createAdminType): Promise<Omit<User, 'password'>> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const adminUser = this.prismaDBClient.user.create({
      omit: { password: true },
      data: {
        ...{ ...data, password: hashedPassword },
        role: {
          connectOrCreate: {
            where: { name: 'SCHOOL_ADMIN' },
            create: {
              name: 'SCHOOL_ADMIN',
              rolePermissions: {
                create: {
                  permission: {
                    connectOrCreate: {
                      where: { name: 'FULL_ACCESS' },
                      create: { name: 'FULL_ACCESS' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    return adminUser;
  }
  async createSchool(data: createSchoolType, userId: string): Promise<School> {
    const school = await this.prismaDBClient.school.create({
      data: {
        ...data,
        admins: {
          create: [
            {
              userId: userId,
              city: data.city,
              tel: data.tel,
              state: data.state,
              street: data.street,
            },
          ],
        },
      },
    });
    return school;
  }
  async createClass(data: createClassType, schoolId: string): Promise<Class> {
    const classRoom = await this.prismaDBClient.class.create({
      data: {
        ...data,
        school: {
          connect: {
            id: schoolId,
          },
        },
      },
    });
    return classRoom;
  }

  async createSubject(data: createSubjectType): Promise<Subject> {
    const subject = await this.prismaDBClient.subject.create({
      data: {
        name: data.name,
        class: {
          connect: { id: data.classId },
        },
      },
    });
    return subject;
  }

  async createTeacher(
    data: createTeacherType,
    schoolId: string
  ): Promise<User> {
    const permissionNames = [
      'READ_TEACHING_METHOD',
      'UPDATE_TEACHING_METHOD',
      'DELETE_TEACHING_METHOD',
    ];
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const teacher = await this.prismaDBClient.user.create({
      data: {
        ...{ ...data, password: hashedPassword },
        role: {
          connectOrCreate: {
            where: { name: 'TEACHER' },
            create: {
              name: 'TEACHER',
              rolePermissions: {
                create: permissionNames.map((name: string) => ({
                  permission: {
                    connectOrCreate: {
                      where: { name },
                      create: { name },
                    },
                  },
                })),
              },
            },
          },
        },
        teacherProfile: {
          create: {
            schoolId: schoolId,
          },
        },
      },
    });
    return teacher;
  }
  async assignTeacherToClass(
    data: teachingAssignmentType
  ): Promise<TeachingAssignment> {
    const teacherProfile = await this.prismaDBClient.teacherProfile.findFirst({
      where: { userId: data.teacherId },
    });
    if (!teacherProfile) {
      throw new Error('NONSTD_TEACHER_ERROR_NO_PROFILE');
    }
    const teacherAssignment =
      await this.prismaDBClient.teachingAssignment.create({
        data: {
          teacher: { connect: { id: teacherProfile.id } },
          class: { connect: { id: data.classId } },
          subject: { connect: { id: data.subjectId } },
        },
      });
    return teacherAssignment;
  }

  async createParentStudentRecords(data: GroupedRecord[], schoolId: string) {
    const uploadedRecords = await this.prismaDBClient.$transaction(
      async (tx) => {
        const parentRole = await tx.role.upsert({
          where: { name: 'PARENT' },
          update: {},
          create: { name: 'PARENT' },
        });
        const plainParentCredentials = data.map((record) => ({
          ...record.parent,
        }));

        const parsedData = await Promise.all(
          data.map(async (item) => ({
            ...item,
            parent: {
              ...item.parent,
              password: await bcrypt.hash(item.parent.password, 10),
            },
          }))
        );
        /**
         * CREATE PARENTS
         */
        const parentUsers = parsedData.map((item) => ({
          name: item.parent.name,
          email: item.parent.email,
          password: item.parent.password,
          roleId: parentRole.id,
        }));

        await tx.user.createMany({
          data: parentUsers,
          skipDuplicates: true,
        });

        const parents = await tx.user.findMany({
          where: {
            email: {
              in: parsedData.map((item) => item.parent.email),
            },
          },
        });

        const userMap = new Map<string, string>();

        parents.forEach((user) => {
          userMap.set(user.email, user.id);
        });

        /**
         * CREATE PARENT PROFILES
         */
        const parentProfiles = parsedData.map((item) => {
          const userId = userMap.get(item.parent.email);

          if (!userId) {
            throw new Error(`Parent user not found for ${item.parent.email}`);
          }

          return {
            userId,
            phoneNumber: item.parent.phone,
            schoolId,
          };
        });

        await tx.parentProfile.createMany({
          data: parentProfiles,
          skipDuplicates: true,
        });

        const profiles = await tx.parentProfile.findMany({
          where: {
            userId: {
              in: parents.map((u) => u.id),
            },
          },
        });

        const profileMap = new Map<string, string>();

        profiles.forEach((profile) => {
          profileMap.set(profile.userId, profile.id);
        });

        /**
         * FETCH CLASSES
         */
        const schoolClasses = await tx.class.findMany({
          where: { schoolId },
        });

        const classMap = new Map<string, string>();

        schoolClasses.forEach((schoolClass) => {
          classMap.set(schoolClass.name, schoolClass.id);
        });

        /**
         * CREATE CHILDREN
         */
        const children: {
          admissionNumber: string;
          classId: string;
          schoolId: string;
          name: string;
        }[] = [];

        parsedData.forEach((item) => {
          item.children.forEach((child) => {
            const classId = classMap.get(child.class);

            if (!classId) {
              throw new Error(`Class ${child.class} not found`);
            }

            children.push({
              admissionNumber: child.admissionNumber,
              classId,
              schoolId,
              name: child.name,
            });
          });
        });

        await tx.child.createMany({
          data: children,
          skipDuplicates: true,
        });

        const childRecords = await tx.child.findMany({
          where: {
            admissionNumber: {
              in: children.map((child) => child.admissionNumber),
            },
          },
        });

        const childMap = new Map<string, string>();

        childRecords.forEach((child) => {
          childMap.set(child.admissionNumber, child.id);
        });

        /**
         * CREATE PARENT-CHILD LINKS
         */
        const links: { parentId: string; childId: string }[] = [];

        parsedData.forEach((item) => {
          const userId = userMap.get(item.parent.email);

          if (!userId) {
            throw new Error(`User ID missing for ${item.parent.email}`);
          }

          const parentId = profileMap.get(userId);

          if (!parentId) {
            throw new Error(`Parent profile missing for ${item.parent.email}`);
          }

          item.children.forEach((child) => {
            const childId = childMap.get(child.admissionNumber);

            if (!childId) {
              throw new Error(`Child missing for ${child.admissionNumber}`);
            }

            links.push({
              parentId,
              childId,
            });
          });
        });

        await tx.parentChildLink.createMany({
          data: links,
          skipDuplicates: true,
        });

        /**
         * RETURN UPLOADED RECORDS
         */
        const uploadedRecord = await tx.user.findMany({
          where: {
            email: {
              in: parsedData.map((item) => item.parent.email),
            },
          },
          include: {
            parentProfile: {
              include: {
                childrenLink: true,
              },
            },
          },
        });

        /**
         * MAIL PARENT LOGIN CREDENTIALS
         */
        return { insertedRecord: uploadedRecord, plainParentCredentials };
      }
    );
    const parents = uploadedRecords.plainParentCredentials.map((record) => {
      return {
        name: record.name,
        email: record.email,
      };
    });
    this.emailService.sendBulkCredentials(
      uploadedRecords.plainParentCredentials
    );
    return parents;
  }

  async getUsers(schoolId: string, limit: number = 10, page: number = 1) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.prismaDBClient.$transaction([
      this.prismaDBClient.user.findMany({
        where: {
          OR: [
            { teacherProfile: { is: { schoolId } } },
            { parentProfile: { is: { schoolId } } },
            { adminProfile: { is: { schoolId } } },
          ],
        },
        omit: { password: true },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prismaDBClient.user.count(),
    ]);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    };
  }
  async deleteUser(email: string): Promise<User> {
    return await userService.delete(email);
  }
}

export default new AdminService(prisma, emailService);
