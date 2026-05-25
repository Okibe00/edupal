/**
 * user --> profile ----> school
 */

import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database.js';

export const schoolGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUser = req.user;

  if (!authUser) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const adminProfile = await prisma.adminProfile.findUnique({
      where: {
        userId: authUser.id,
      },
      include: { school: true },
    });

    if (adminProfile) {
      req.school = adminProfile.school.name;
      req.schoolId = adminProfile.schoolId;
      return next();
    }
    throw new Error();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

type ProfileDelegate = {
  findUnique: Function;
};

export const createSchoolGuard = (profileModel: ProfileDelegate) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authUser = req.user;

    if (!authUser) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const profile = await profileModel.findUnique({
        where: {
          userId: authUser.id,
        },
        include: {
          school: true,
        },
      });

      if (!profile) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.school = profile.school.name;
      req.schoolId = profile.schoolId;

      return next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
};

export const adminSchoolGuard = createSchoolGuard(prisma.adminProfile);

export const teacherSchoolGuard = createSchoolGuard(prisma.teacherProfile);

export const parentSchoolGuard = createSchoolGuard(prisma.parentProfile);
