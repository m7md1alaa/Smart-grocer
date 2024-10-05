import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import storesRouter from './routes/stores/routes';
import productsRouter from './routes/products/routes';

const createApp = () => {
  const app = express();

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Register routes
  app.use('/api/stores', storesRouter);
  app.use('/api/products', productsRouter);

  // Global error handler
  app.use(errorHandler);

  return app;
};

export { createApp };
