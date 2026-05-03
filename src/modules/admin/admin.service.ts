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
    schoolId: string,
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
  //This is a heavy task that needs to go in a worker
  async createParentStudentRecords(data: object) {}
}

export default new AdminService(prisma, emailService);
