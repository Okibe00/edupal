import { Request, NextFunction, Response } from 'express';
import parentService from './parent.service.js';
import z from 'zod';
import { sendSuccess } from '../../common/utils/utils.js';
export class ParentController {
  async fetchParent(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user?.email!;
      const result = await parentService.fetchParent(email);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }

  async fetchChildLessonGuides(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = req.query;
      const parsedData = await z.parseAsync(
        z.object({ childId: z.uuid() }),
        data
      );
      const schoolId = req.schoolId!;
      const result = await parentService.fetchChildLearningActivity(
        parsedData.childId,
        schoolId
      );
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }

  async streakManagement(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const result = await parentService.streakManagement(userId!);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async pointManagement(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id;
      const query = await z.parseAsync(
        z.object({ lessonId: z.uuid() }),
        req.query
      );
      const result = await parentService.pointManagement(
        userId!,
        query.lessonId
      );
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
}

export default new ParentController();
