import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
export function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(400).json({
    error: error,
  });
}
