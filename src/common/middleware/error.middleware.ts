import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '../../../generated/prisma/client.js';
import { logger } from '../../config/logger.js';
import multer from 'multer';
import { AppError } from '../utils/customError.js';

export function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.info(error, error.message);
  if (error instanceof ZodError) {
    return res.status(400).json({
      status: 'fail',
      code: 'VALIDATION_ERROR',
      errors: error.issues.map((e) => ({
        field: e.path.join('.'),
        message: e.message,
      })),
    });
  }
  if (error instanceof AppError) {
    if (error.code === 'NONSTD_TEACHER_NOT_ASSIGNED_SUBJECT') {
      return res.json({
        status: 'error',
        code: error.code,
        message: error.message,
      });
    }
    if (error.code === 'NONSTD_SCHOOL_STATE_NOT_FOUND') {
      return res.json({
        status: 'error',
        code: error.code,
        message: error.message,
      });
    }
    if (error.code === 'NONSTD_USER_NOT_FOUND') {
      return res.json({
        status: 'error',
        code: error.code,
        message: error.message,
      });
    }
    if (error.code === 'NONSTD_PARENT_PROFILE_NOT_FOUND') {
      return res.json({
        status: 'error',
        code: error.code,
        message: error.message,
      });
    }
    if (error.code === 'ACCESS_DENIED') {
      return res.json({
        status: 'error',
        code: error.code,
        message: error.message,
      });
    }
  }
  if (error instanceof multer.MulterError) {
    return res.status(400).json({
      status: 'error',
      code: 'BAD_REQUEST',
      message: 'File upload failed',
    });
  }
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const target =
        (error.meta?.['target'] as string | string[] | undefined) || [];

      if (target.includes('rank') || target.includes('columnId_rank')) {
        return res.status(409).json({
          status: 'error',
          code: 'CONCURRENCY_CONFLICT',
          message:
            'Another user modified this list at the exact same time. Please refresh and try again.',
        });
      }

      return res.status(409).json({
        status: 'error',
        code: 'DUPLICATE_DATA',
        message: 'A conflict occurred. This data already exists.',
      });
    }

    if (error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        code: 'NOT_FOUND_OR_STALE',
        message:
          'The requested record was not found, or it was recently modified by another user. Your changes could not be saved.',
      });
    }

    if (error.code === 'P2003') {
      return res.status(400).json({
        status: 'error',
        code: 'INVALID_RELATION',
        message:
          'The requested operation failed because a related record does not exist (e.g., assigning a card to a non-existent column).',
      });
    }
  }

  if (error.message === 'NONSTD_USER_EXIST') {
    return res.status(409).json({
      status: 'Error',
      code: 'CONFLICT_RESOURCE_EXIST',
      message: 'Resource already exist',
    });
  }
  if (error.message === 'NONSTD_USER_NOT_FOUND') {
    return res.status(404).json({
      status: 'Error',
      code: 'CONFLICT_PASSWORD_EMAIL_NOT_FOUND',
      message: 'Password or email not found',
    });
  }
  if (error.message === 'NONSTD_INVALID_TOKEN') {
    return res.status(401).json({
      status: 'Error',
      code: 'INVALID_TOKEN',
      message: 'Token expired or revoked',
    });
  }

  return res.status(500).json({
    status: Error,
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong',
  });
}
