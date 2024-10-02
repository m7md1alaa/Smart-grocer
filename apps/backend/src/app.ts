import express, { Request, Response } from "express";

export const startApp = () => {
  const app = express();

  // Example route
  app.get('/', (req, res) => {
    res.send('Backend is running...');
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
