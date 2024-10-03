import { Router, Request, Response } from "express";
import { startApp } from "./app"; // Import startApp

const rootRouter: Router = Router();

// Example route
rootRouter.get("/example", (req: Request, res: Response) => {
  res.send("This is an example route.");
});

export default rootRouter;

startApp();