import { Router } from "express";

import { createProduct, getProductsList, getProductById, updateProduct } from "./controller";

const productsRouter: Router = Router();

productsRouter.get("/", getProductsList);

productsRouter.get("/:id", getProductById);

productsRouter.put("/:id", updateProduct);

productsRouter.post("/:id/stores", associateProductWithStores);

productsRouter.post("/", createProduct);


// productsRouter.delete("/", deleteProduct);

export default productsRouter;