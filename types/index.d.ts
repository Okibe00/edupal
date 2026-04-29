import { string } from 'zod';
import { Request } from 'express';
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
      school?: string;
    }
  }
}

export interface AuthRequest extends Request {
  user?: {
    email: string;
    id: string;
  };
}
