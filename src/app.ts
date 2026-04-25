import express from 'express';
import { Response, Request, NextFunction } from 'express';
import patientRoute from './modules/patient/patients.routes.js';
import { globalErrorHandler } from './common/middleware/error.middleware.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger/swagger.js';
import authRoute from './modules/auth/auth.routes.js';
import helmet from 'helmet';
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
app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'Welcome to Edupal',
  });
});

app.use('/api/v1', authRoute);

/**
 * CATCH ALL ROUTES
 */
app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    message: 'Not Found',
  });
});

/**
 * GLOBAL ERROR HANDLER
 */
app.use(globalErrorHandler);
export { app };
