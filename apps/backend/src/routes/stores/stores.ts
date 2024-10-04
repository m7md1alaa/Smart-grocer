import { Router, Request, Response } from "express";

// Create a router for stores
const storesRouter: Router = Router();

// Example route: Get all stores
storesRouter.get('/stores', (req: Request, res: Response) => {
  res.json({ message: 'List of all stores' });
});

export default storesRouter;
