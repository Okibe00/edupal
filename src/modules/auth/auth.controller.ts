import { NextFunction, Response, Request } from 'express';
import z from 'zod';
import {
  tokenSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from './dto/auth.dto.js';
import authService from './auth.service.js';
import { sendSuccess } from '../../common/utils/utils.js';

class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(loginSchema, req.body);
      const result = await authService.login(body);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const result = await authService.logout(userId!);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { token } = await z.parseAsync(tokenSchema, req.query);
      const result = await authService.refreshToken(token);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = await z.parseAsync(forgotPasswordSchema, req.body);
      const result = await authService.forgotPassword(email);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await z.parseAsync(resetPasswordSchema, req.body);
      const result = await authService.resetPassword(data);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
}
export default new AuthController();
