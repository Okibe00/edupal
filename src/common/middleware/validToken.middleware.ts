import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../config/database.js';
import { AppError } from '../utils/customError.js';

export function unless(
  paths: string[],
  middleware: (req: Request, res: Response, next: NextFunction) => void
) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (paths.includes(req.path)) {
      return next();
    }
    return middleware(req, res, next);
  };
}

export async function isValidToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.user?.id;
    const refreshSession = await prisma.refreshToken.findUnique({
      where: { userId: userId! },
    });
    if (refreshSession && refreshSession.revoked) {
      throw new AppError(
        'Expired or revoked token please login to continue',
        401,
        'ACCESS_DENIED'
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}
