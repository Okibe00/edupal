import { Request, NextFunction, Response } from 'express';
import notificationService from './notification.service.js';
import { sendSuccess } from '../../common/utils/utils.js';
import z from 'zod';

export class NotificationController {
  async fetchNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id!;
      const result = await notificationService.fetchNotification(userId);
      return sendSuccess(res, 200, 'success', result);
    } catch (error: any) {
      return next(error);
    }
  }

  async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const query = await z.parseAsync(
        z.object({
          id: z.uuid(),
        }),
        req.query
      );
      const result = await notificationService.markAsRead(query.id);
      return sendSuccess(res, 200, 'success', result);
    } catch (error: any) {
      return next(error);
    }
  }
}
export default new NotificationController();
