import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";

// Create a router for products
const productsRouter: Router = Router();
const prisma = new PrismaClient()

productsRouter.get("/products", (req: Request, res: Response) => {
  const products = prisma.products.findMany()
  res.json({products});
});

// Route for getting product details by ID
productsRouter.get("/stores/:storeId/products/:id",
  (req: Request, res: Response) => {
    const productId = req.params.id;
    const storeId = req.params.id;
    res.json({ message: `Product details for product ID: ${productId}` });
  }
);

productsRouter.post('/stores/:storeId/products', (req: Request, res: Response) => {
  const storeId = req.params.storeId;
  const { productId, barcodes, categoryId } = req.body;
  res.json({
    message: `Product added to the store (${storeId})`,
    data: {
      storeId,
      productId,
      barcodes,
      categoryId,
    },
  });
});

export default productsRouter;
