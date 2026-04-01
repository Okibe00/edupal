import { NextFunction } from 'express';

export class PatientContoller {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      //parse the request
      //pass the request  to the right service
    } catch (error: any) {
      next(error);
    }
  }
}

export default new PatientContoller();
