import { Request, Response, NextFunction } from 'express';
import fs from 'node:fs/promises';
import z from 'zod';
import { createAdminSchema } from './schema/adminSignup.schema.js';
import adminService from './admin.service.js';
import { sendSuccess } from '../../common/utils/utils.js';
import { CreateSchoolSchema } from './schema/createSchool.schema.js';
import { createClassSchema } from './schema/createClass.schema.js';
import { createSubjectSchema } from './schema/createSubject.schema.js';
import { createTeacherSchema } from './schema/createTeacher.schema.js';
import { teachingAssignmentSchema } from './schema/teachingAssignment.schema.js';
import { logger } from '../../config/logger.js';
import { parseExcel } from '../../common/utils/parseExcel.js';
import { groupByParent } from '../../common/utils/groupParent.js';
import {
  linkChildSchema,
  ParentChildRecord,
  ParentRecordSchema,
} from './schema/parentRecord.schema.js';
import { FetchAllSchema } from './schema/fetchAll.schema.js';
import { SchoolStateSchema } from './schema/schoolState.schema.js';

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
  async uploadParent(req: Request, res: Response, next: NextFunction) {
    try {
      const FILEPATH = req.file?.path;
      if (FILEPATH) {
        let data, groupedParent;
        data = parseExcel(FILEPATH);
        groupedParent = groupByParent(data);
        const parsedData = await z.parseAsync(
          ParentRecordSchema,
          groupedParent
        );
        const result = await adminService.createParentStudentRecords(
          parsedData,
          req.schoolId!
        );
        return sendSuccess(res, 200, 'File upload successfully', result);
      }
    } catch (error: any) {
      return next(error);
    } finally {
      const filePath = req.file?.path;
      if (filePath) {
        logger.info(`Deleting ${filePath}`);
        fs.unlink(filePath).catch((error) => {
          logger.info(error);
        });
      }
    }
  }
  async registerParent(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const parsedBody = await z.parseAsync(ParentChildRecord, data);
      const groupedParent = groupByParent(parsedBody);
      const parsedData = await z.parseAsync(ParentRecordSchema, groupedParent);
      const result = await adminService.createParentStudentRecords(
        parsedData,
        req.schoolId!
      );
      return sendSuccess(res, 200, 'Parent registered successfully', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async linkChild(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      console.log(req.schoolId);
      const parsedBody = await z.parseAsync(linkChildSchema, data);
      const result = await adminService.createChild(parsedBody, req.schoolId!);
      return sendSuccess(res, 200, 'Child registered successfully', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async fetchAll(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const { limit, page } = await z.parseAsync(FetchAllSchema, query);
      const result = await adminService.getUsers(req.schoolId!, limit, page);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const { email } = await z.parseAsync(
        z.object({ email: z.email() }),
        body
      );
      const result = await adminService.deleteUser(email);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
  async schoolState(req: Request, res: Response, next: NextFunction) {
    try {
      const schoolId = req.schoolId!;
      const parsedData = await z.parseAsync(SchoolStateSchema, req.body);
      const result = await adminService.createSchoolState(schoolId, parsedData);
      return sendSuccess(res, 200, 'Success', result);
    } catch (error: any) {
      return next(error);
    }
  }
}

export default new AdminController();
