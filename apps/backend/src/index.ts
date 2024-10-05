// index.ts
import { Router } from "express";

import productsRouter from "./routes/products/routes";
import storesRouter from "./routes/stores/routes";

// Create a new router instance
const rootRouter: Router = Router();

rootRouter.use(storesRouter);
rootRouter.use(productsRouter);

export default rootRouter;
