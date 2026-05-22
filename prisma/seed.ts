import {
  UserRole,
  DocumentStatus,
} from '../generated/prisma/client.js';
import { prisma } from '../src/config/database.js';
import bcrypt from 'bcrypt';

async function main() {
  const SALT_ROUNDS = 10;

  // =========================
  // HASH PASSWORDS
  // =========================
  const adminPassword = await bcrypt.hash('Admin123!', SALT_ROUNDS);

  const teacherPassword = await bcrypt.hash('Teacher123!', SALT_ROUNDS);

  const parentPassword = await bcrypt.hash('Parent123!', SALT_ROUNDS);

  // ======================================================
  // EVERYTHING RUNS INSIDE A SINGLE DATABASE TRANSACTION
  // ======================================================
  await prisma.$transaction(async (tx) => {
    // =========================
    // ROLES
    // =========================
    const schoolAdminRole = await tx.role.upsert({
      where: {
        name: UserRole.SCHOOL_ADMIN,
      },
      update: {},
      create: {
        name: UserRole.SCHOOL_ADMIN,
      },
    });

    const teacherRole = await tx.role.upsert({
      where: {
        name: UserRole.TEACHER,
      },
      update: {},
      create: {
        name: UserRole.TEACHER,
      },
    });

    const parentRole = await tx.role.upsert({
      where: {
        name: UserRole.PARENT,
      },
      update: {},
      create: {
        name: UserRole.PARENT,
      },
    });

    // =========================
    // SCHOOL
    // =========================
    const school = await tx.school.create({
      data: {
        name: 'Greenfield International School',
        subdomain: 'greenfield',
        city: 'Lagos',
        state: 'Lagos',
        street: '12 Admiralty Way',
        tel: '+2348012345678',
        type: 'Primary School',

        schoolState: {
          create: {
            term: 'FIRST_TERM',
            week: 1,
          },
        },
      },
    });

    // =========================
    // ADMIN
    // =========================
    const adminUser = await tx.user.create({
      data: {
        name: 'School Administrator',
        email: 'okibeogomola@gmail.com',
        password: adminPassword,
        isVerified: true,
        roleId: schoolAdminRole.id,

        adminProfile: {
          create: {
            city: 'Lagos',
            state: 'Lagos',
            tel: '+2348011111111',
            schoolId: school.id,
          },
        },
      },
    });

    // =========================
    // CLASSES
    // =========================
    const primaryOne = await tx.class.create({
      data: {
        name: 'Primary',
        yearGroup: 1,
        schoolId: school.id,
      },
    });

    const primaryTwo = await tx.class.create({
      data: {
        name: 'Primary',
        yearGroup: 2,
        schoolId: school.id,
      },
    });

    // =========================
    // SUBJECTS
    // =========================
    const mathematics = await tx.subject.create({
      data: {
        name: 'Mathematics',
        classId: primaryOne.id,
      },
    });

    const english = await tx.subject.create({
      data: {
        name: 'English Language',
        classId: primaryOne.id,
      },
    });

    // =========================
    // TEACHERS
    // =========================
    const teacherOne = await tx.user.create({
      data: {
        name: 'John Doe',
        email: 'okibethedev@gmail.com',
        password: teacherPassword,
        isVerified: true,
        roleId: teacherRole.id,

        teacherProfile: {
          create: {
            schoolId: school.id,
          },
        },
      },

      include: {
        teacherProfile: true,
      },
    });

    const teacherTwo = await tx.user.create({
      data: {
        name: 'Jane Smith',
        email: 'jane.teacher@greenfield.com',
        password: teacherPassword,
        isVerified: true,
        roleId: teacherRole.id,

        teacherProfile: {
          create: {
            schoolId: school.id,
          },
        },
      },

      include: {
        teacherProfile: true,
      },
    });

    // =========================
    // TEACHING ASSIGNMENTS
    // =========================
    await tx.teachingAssignment.create({
      data: {
        teacherId: teacherOne.teacherProfile!.id,
        classId: primaryOne.id,
        subjectId: mathematics.id,
      },
    });

    await tx.teachingAssignment.create({
      data: {
        teacherId: teacherTwo.teacherProfile!.id,
        classId: primaryOne.id,
        subjectId: english.id,
      },
    });

    // =========================
    // PARENTS
    // =========================
    const parentOne = await tx.user.create({
      data: {
        name: 'Michael Johnson',
        email: 'okibeonmeje5@gmail.com',
        password: parentPassword,
        isVerified: true,
        roleId: parentRole.id,

        parentProfile: {
          create: {
            phoneNumber: '+2348099991111',
            schoolId: school.id,

            streakHistory: {
              create: {},
            },

            longestStreak: {
              create: {},
            },

            lessonRead: {
              create: {
                lessonIds: [],
              },
            },
          },
        },
      },

      include: {
        parentProfile: true,
      },
    });

    const parentTwo = await tx.user.create({
      data: {
        name: 'Sarah Williams',
        email: 'testingcyclewise@gmail.com',
        password: parentPassword,
        isVerified: true,
        roleId: parentRole.id,

        parentProfile: {
          create: {
            phoneNumber: '+2348099992222',
            schoolId: school.id,

            streakHistory: {
              create: {},
            },

            longestStreak: {
              create: {},
            },

            lessonRead: {
              create: {
                lessonIds: [],
              },
            },
          },
        },
      },

      include: {
        parentProfile: true,
      },
    });

    // =========================
    // CHILDREN
    // =========================
    const childOne = await tx.child.create({
      data: {
        name: 'Daniel Johnson',
        admissionNumber: 'GRN-001',
        classId: primaryOne.id,
        schoolId: school.id,
      },
    });

    const childTwo = await tx.child.create({
      data: {
        name: 'Sophia Williams',
        admissionNumber: 'GRN-002',
        classId: primaryTwo.id,
        schoolId: school.id,
      },
    });

    // =========================
    // PARENT-CHILD LINKS
    // =========================
    await tx.parentChildLink.create({
      data: {
        parentId: parentOne.parentProfile!.id,
        childId: childOne.id,
      },
    });

    await tx.parentChildLink.create({
      data: {
        parentId: parentTwo.parentProfile!.id,
        childId: childTwo.id,
      },
    });

    // =========================
    // LESSON GUIDE
    // =========================
    const lessonGuide = await tx.lessonGuide.create({
      data: {
        week: 1,
        topic: 'Introduction to Numbers',

        learningObjectives: 'Students should understand counting from 1 to 20',

        learningContent:
          'Counting numbers, identifying numbers, simple addition',

        status: DocumentStatus.PUBLISHED,

        subjectId: mathematics.id,

        attachments: {
          create: [
            {
              url: '/uploads/lesson-guides/week-1-math.pdf',
            },
          ],
        },
      },
    });

    // =========================
    // LESSON ENGAGEMENT
    // =========================
    await tx.lessonEngagement.create({
      data: {
        parentId: parentOne.parentProfile!.id,
        childId: childOne.id,
        lessonId: lessonGuide.id,

        status: 'COMPLETED',

        startedAt: new Date(),
        completedAt: new Date(),

        pointsEarned: 10,
        streakCountAtCompletion: 1,

        sectionEngagements: {
          create: [
            {
              sectionName: 'Introduction',
              viewed: true,
              completed: true,
              firstViewedAt: new Date(),
              lastViewedAt: new Date(),
            },

            {
              sectionName: 'Practice Exercise',
              viewed: true,
              completed: true,
              firstViewedAt: new Date(),
              lastViewedAt: new Date(),
            },
          ],
        },
      },
    });

    console.log('✅ Seed transaction completed');

    console.log({
      school: school.name,
      admin: adminUser.email,

      teachers: [teacherOne.email, teacherTwo.email],

      parents: [parentOne.email, parentTwo.email],
    });
  });
}

main()
  .catch((error) => {
    console.error('❌ Seed failed');
    console.error(error);

    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
