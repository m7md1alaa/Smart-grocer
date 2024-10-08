import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { createProductSchema } from "./zod.schema";
import * as z from "zod";

const prisma = new PrismaClient().product;

export const getProductsList = async (req: Request, res: Response) => {
  try {
    const products = await prisma.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching product" });
  }
};

// Route for getting product details by ID
export const getProductById = async (req: Request, res: Response) => {
  const id = +req.params.id;
  try {
    const product = await prisma.findUnique({
      where: {
        ProductId: id,
      },
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
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const validatedData = createProductSchema.parse(req.body);

  try {
    if (validatedData.barcode) {
      const existingProduct = await prisma.findUnique({
        where: { barcode: validatedData.barcode },
      });

      if (existingProduct) {
        return res.status(400).json({
          error: "Duplicate Barcode",
          message:
            "The barcode must be unique. A product with this barcode already exists.",
        });
      }
    }

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
    console.error("Error creating product:", error);

    // Enhanced error handling
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(400).json({
          error: "Unique Constraint Violation",
          message:
            "The barcode must be unique. A product with this barcode already exists.",
        });
      }
    }

    // Handle validation errors from Zod
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation Error",
        message: "Invalid input data.",
        issues: error.errors, // Provide details about validation issues
      });
    }

    // Catch-all for any other errors
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const validatedData = createProductSchema.parse(req.body);
  const id = req.params.id;
  try {
    const updatedProduct = await prisma.update({
      where: {
        ProductId: +id,
      },
      data: {
        ...validatedData,
      },
    });
    res.status(201).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updateding product:", error);
    res.status(400).send("Error updateding product:");
    // Handle validation errors from Zod
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: "Validation Error",
        message: "Invalid input data.",
        issues: error.errors,
      });
    }
    res.status(500).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};
