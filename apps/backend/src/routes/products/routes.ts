import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";





// Create a router for products
const productsRouter: Router = Router();

const prisma = new PrismaClient();

productsRouter.get("/products", (req: Request, res: Response) => {
  const products = prisma.product.findMany();
  res.json({ products });
});

// Route for getting product details by ID
productsRouter.get(
  "/:id/:storeId",
  (req: Request, res: Response) => {
    const productId = req.params.id;
    const storeId = req.params.storeId;
    res.json({ message: `Product details for product ID: ${productId}` });
  }
);

productsRouter.post(
  "/stores/:storeId/products",
  async (req: Request, res: Response) => {
    const storeId: string = req.params.storeId;
    const { ProductTitle, description, barcodes, categories } = req.body;

    try {
      const newProduct = await prisma.product.create({
        data: {
          ProductTitle,
          description,
          categories,
        },
      });
    } catch (error) {
      if (storeId === undefined) {
        res.status(404).send("The Store not found")
      } else {
        
      }
    }
    res.json({
      message: `The Product added to the store (${storeId}) successfully`,
      data: {
        storeId,
      },
    });
  }
);

export default productsRouter;
