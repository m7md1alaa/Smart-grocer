import { Router } from "express";
import storesRouter from "./routes/stores/stores";
import productsRouter from "./routes/products/products";
import pricesRouter from "./routes/prices/prices";

// Create a new router instance
const rootRouter: Router = Router();

// Mount subrouters under respective paths
rootRouter.use(storesRouter);   // /stores routes
rootRouter.use(productsRouter); // /products routes
rootRouter.use(pricesRouter);   // /prices routes

// Export the rootRouter for use in app.ts
export default rootRouter;
