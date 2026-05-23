import express from 'express';
import { Response, Request, NextFunction } from 'express';
import { globalErrorHandler } from './common/middleware/error.middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger/swagger.js';
import authRoute from './modules/auth/auth.routes.js';
import adminRoute from './modules/admin/admin.routes.js';
import teacherRoute from './modules/teacher/teacher.routes.js';
import parentRoute from './modules/parent/parent.routes.js';
import helmet from 'helmet';
import {
  isValidToken,
  unless,
} from './common/middleware/validToken.middleware.js';
import { authGuard } from './common/middleware/authguard.middleware.js';
const app = express();

/**
 * MIDDLEWARES
 */
app.use(express.json());
app.use(helmet());

/**
 * Swagger Documentation
 */
app.use(
  '/api/v1/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    swaggerOptions: { cache: false },
  })
);
app.get('/api/v1/api-docs.json', (req, res) => {
  res.json(swaggerSpec);
});
/**
 * APP ROUTES
 */

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  return res.redirect('/api/v1/api-docs');
});
app.use(unless(['/api/v1/auth/login'], authGuard));
app.use(unless(['/api/v1/auth/login'], isValidToken));
app.use('/api/v1', authRoute);
app.use('/api/v1', adminRoute);
app.use('/api/v1', teacherRoute);
app.use('/api/v1', parentRoute);

/**
 * CATCH ALL ROUTES
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    message: 'Not Found',
  });
});
//Ensure hostname is correct  when run behind a proxy;
app.set('trust proxy', true);
/**
 * GLOBAL ERROR HANDLER
 */
app.use(globalErrorHandler);
export { app };
