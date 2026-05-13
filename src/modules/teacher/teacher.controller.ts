import { Request, NextFunction, Response } from 'express';
import teacherService from './teacher.service.js';
import { LearningContentSchema } from './schema/learningContent.schema.js';
import z from 'zod';
import { sendSuccess } from '../../common/utils/utils.js';
export class TeacherController {
  async fetchTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.user?.email!;
      const result = await teacherService.fetchTeacher(email);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async fetchTeacherClass(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherId = req.user?.id!;
      const result = await teacherService.fetchTeacherClass(teacherId);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async fetchTeacherSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const teacherId = req.user?.id!;
      const result = await teacherService.fetchTeacherSubject(teacherId);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }

  async createLessonGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const FILEPATH = req.file?.path;
      const body = await z.parseAsync(LearningContentSchema, req.body);
      if (FILEPATH) {
        const result = await teacherService.createLessionGuide(body, FILEPATH);
        return sendSuccess(res, 200, 'success', result);
      }
    } catch (error: any) {
      return next(error);
    }
  }
  async fetchLearningContent(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      return res.download(query['url'] as string);
    } catch (error: any) {
      return next(error);
    }
  }
  async fetchLessonGuide(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id!;
      const result = await teacherService.fetchLessionGuide(userId);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async fetchLessonById(req: Request, res: Response, next: NextFunction) {
    try {
      const parsedQuery = await z.parseAsync(z.object({id: z.uuid()}), req.query)
      const result = await teacherService.getLessionById(parsedQuery.id);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async fetchLearners(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.id!;
      const result = await teacherService.fetchLearners(userId);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
}

export default new TeacherController();
