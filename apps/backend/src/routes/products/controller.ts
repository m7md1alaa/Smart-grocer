import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { createProductSchema } from "./zod.schema";
import * as z from "zod";

const prisma = new PrismaClient().product;

export const getProductsList = async (req: Request, res: Response) => {
  const products = await prisma.findMany();
  res.status(200).json(products);
};

// Route for getting product details by ID
export const getProductById = async (req: Request, res: Response) => {
  const id = +req.params.id;
  try{
   const product = await prisma.findUnique({where:{
      ProductId:id
   }   
});

if (!product) {
   res.status(404).json({ message: `product with ID ${id} not found.` });
 } else {
   res
     .status(200)
     .json({ message: `Details of product with ID ${id}`, data: product });
 }
} catch (error) {
 console.error(error);
 res.status(500).json({ message: "Error fetching store" });
}
};

export const createProduct = async (req: Request, res: Response) => {
  const validatedData = createProductSchema.parse(req.body);

  try {
    const newProduct = await prisma.create({
      data: {
        ...validatedData,
      },
    });
    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // If validation fails, respond with a 400 status
      res.status(400).json({
        message: "Invalid input data",
        errors: error,
      });
    } else {
      // Catch any other errors and log them
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
};
