import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
const route = Router();

route.get('/home', async (req: Request, res: Response) => {
  console.log(req.originalUrl);
  return res.status(200).json({
    message: 'Patient home page'
  })
});
export default route;
