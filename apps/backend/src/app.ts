import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import rootRouter from "./index"; // Import rootRouter from index.ts
import http, { Server } from 'http';

dotenv.config();

const createApp = () => {
  const app = express();

  // Middleware to parse JSON body
  app.use(express.json());

  // Define your root router under '/api'
  app.use("/api", rootRouter);

  // Global error handler
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    console.error(error.stack);
    res.status(500).send('Something broke!');
  });

  return app;
};

// Function to start the server
export const startServer = () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;

  const server: Server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Graceful shutdown on SIGINT
  process.on('SIGINT', () => {
    console.log('SIGINT signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });

  server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
};
