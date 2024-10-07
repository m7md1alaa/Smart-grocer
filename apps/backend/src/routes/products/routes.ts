import { Router } from "express";

import { createProduct, getProductsList, getProductById } from "./controller";

const productsRouter: Router = Router();

productsRouter.get("/", getProductsList);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", createProduct);

productsRouter.put("/", createProduct);

productsRouter.delete("/", createProduct);

export default productsRouter;