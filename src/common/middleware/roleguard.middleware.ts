import { Request, Response, NextFunction } from 'express';
import userService from '../../modules/user/user.service.js';

export const roleGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authUser = req.user;

  if (!authUser) {
    return res.status(401).json({ success: false, message: 'UNAUTHORIZED' });
  }

  try {
    const userRole = await userService.fetchRole(authUser.id);
    if (userRole && userRole?.role?.name === 'SCHOOL_ADMIN') {
      return next();
    }
    throw new Error();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'UNAUTHORIZED' });
  }
};
