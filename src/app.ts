import express from 'express';
import { Response, Request, NextFunction } from 'express';
import patientRoute from './modules/patient/patients.routes.js';
import { globalErrorHandler } from './common/middleware/error.middleware.js';

const app = express();

/**
 * MIDDLEWARES
 */
app.use(express.json());

/**
 * APP ROUTES 
 */
app.get('/api/v1', async (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: 'Welcome to HealthBridge',
  });
});

app.use('/api/v1/patient', patientRoute)

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
