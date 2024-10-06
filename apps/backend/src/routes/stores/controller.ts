import { Prisma, PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import { StoreCreateSchema } from "./zod.schema";
import * as z from "zod";

// Create a router for stores

const prisma = new PrismaClient().store;

export const getStoresList = async (req: Request, res: Response) => {
  try {
    const stores = await prisma.findMany({
      include: {
        Products: true,
      },
    });
    if (stores.length === 0) {
      res.status(404).json({ message: "No stores found." });
    } else {
      res.status(200).json({ message: "List of all stores", data: stores });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching stores" });
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const store = await prisma.findUnique({
      where: { StoreId: +id },
    });

    if (!store) {
      res.status(404).json({ message: `Store with ID ${id} not found.` });
    } else {
      res
        .status(200)
        .json({ message: `Details of store with ID ${id}`, data: store });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching store" });
  }
};

export const createStore = async (req: Request, res: Response) => {
  try {
    const validatedData = StoreCreateSchema.parse(req.body);

    const newStore = await prisma.create({ data: validatedData });

    res.status(201).json({
      message: "Store added successfully",
      data: newStore,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        message: "Invalid input data",
        errors: error.errors,
      });
    }
    console.error(error);
    res.status(500).json({ message: "Error creating store" });
  }
};
export const updateStore = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Validate request body data
    const validatedData = StoreCreateSchema.parse(req.body);

    // Attempt to update the store
    const store = await prisma.update({
      where: { StoreId: +id },
      data: validatedData,
    });

    // If the store was successfully updated, return success response
    res
      .status(200)
      .json({ message: `Details of store with ID ${id}`, data: store });
  } catch (error: any) {
    console.error(error);

    // Check if the error is a PrismaClientKnownRequestError and has a 'P2025' code
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      res.status(404).json({ message: `Store with ID ${id} not found.` });
    } else {
      res.status(500).json({ message: "Error updating store" });
    }
  }
};

export const deleteStore = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Await the result of the deletion
    const store = await prisma.delete({
      where: { StoreId: +id },
    });

    if (!store) {
      res.status(404).json({ message: `Store with ID ${id} not found.` });
    } else {
      res.status(200).json({
        message: `The store with ID ${id} deleted successfully`,
      });
    }
  } catch (error) {
    console.error(error);
    // Handle specific Prisma errors such as not finding the store
    if (error === "P2025") {
      // Prisma error for 'Record not found'
      res.status(404).json({ message: `Store with ID ${id} not found.` });
    } else {
      res.status(500).json({ message: "Error deleting store" });
    }
  }
};
