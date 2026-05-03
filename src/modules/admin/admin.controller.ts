import { Request, Response, NextFunction } from 'express';
import z from 'zod';
import { createAdminSchema } from './schema/adminSignup.schema.js';
import adminService from './admin.service.js';
import { sendSuccess } from '../../common/utils/utils.js';
import { CreateSchoolSchema } from './schema/createSchool.schema.js';
import { createClassSchema } from './schema/createClass.schema.js';
import { createSubjectSchema } from './schema/createSubject.schema.js';
import { createTeacherSchema } from './schema/createTeacher.schema.js';
import { teachingAssignmentSchema } from './schema/teachingAssignment.schema.js';

export class AdminController {
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(createAdminSchema, req.body);
      const result = await adminService.signup(body);
      return sendSuccess(res, 200, 'Admin created Successfully', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async createSchool(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(CreateSchoolSchema, req.body);
      const userId = req.user?.id as string;
      const result = await adminService.createSchool(body, userId);
      return sendSuccess(res, 200, 'School created Successfully', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async createClass(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(createClassSchema, req.body);
      const schoolId = req.schoolId as string;
      const result = await adminService.createClass(body, schoolId);
      return sendSuccess(res, 200, 'Class created Successfully', result);
    } catch (error: any) {
      return next(error);
    }
  }

  async createSubject(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(createSubjectSchema, req.body);
      const result = await adminService.createSubject(body);
      return sendSuccess(res, 200, 'Subject created Successfully', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async createTeacher(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(createTeacherSchema, req.body);
      const schoolId = req.schoolId as string;
      const result = await adminService.createTeacher(body, schoolId);
      return sendSuccess(res, 200, 'User created Successfully', result);
    } catch (error: any) {
      return next(error);
    }
  }

  async assignTeacherToClass(req: Request, res: Response, next: NextFunction) {
    try {
      const body = await z.parseAsync(teachingAssignmentSchema, req.body);
      const result = await adminService.assignTeacherToClass(body);
      return sendSuccess(
        res,
        200,
        'Teacher assigned created Successfully',
        result
      );
    } catch (error: any) {
      return next(error);
    }
  }
}

export default new AdminController();
