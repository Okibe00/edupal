import { NextFunction, Response, Request } from 'express';
import z from 'zod';
import { tokenSchema, signupSchema, loginSchema } from './dto/auth.dto.js';
import authService from './auth.service.js';
import { sendSuccess } from '../../common/utils/utils.js';

class AuthController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(signupSchema, req.body);
      const result = await authService.signup(body);
      return sendSuccess(res, 201, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(loginSchema, req.body);
      const result = await authService.login(body);
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
}
export default new AuthController();
