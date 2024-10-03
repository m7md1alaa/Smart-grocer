import express, { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import rootRouter from "./index";


dotenv.config();

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use("/api", rootRouter);
  

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

  return app;
};

export const startApp = () => {
  const app = createApp();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
