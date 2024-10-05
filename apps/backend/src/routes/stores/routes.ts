import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from "express";
import { StoreCreateSchema } from "./zod.schema";
import * as z from "zod";

// Create a router for stores
const storesRouter: Router = Router();
const prisma = new PrismaClient();

storesRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    try {
      const stores = await prisma.store.findMany();
      if (stores.length === 0) {
        res.status(404).json({ message: "No stores found." });
      } else {
        res.json({ message: "List of all stores", data: stores });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching stores" });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      // Validate request body using Zod
      const validatedData = StoreCreateSchema.parse(req.body);

      const newStore = await prisma.store.create({ data: validatedData });

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
  });

  storesRouter.route("/:id").get(async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const store = await prisma.store.findUnique({
        where: { StoreId: +id },
      });
  
      if (!store) {
        res.status(404).json({ message: `Store with ID ${id} not found.` });
      } else {
        res.json({ message: `Details of store with ID ${id}`, data: store });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching store" });
    }
  });
  
  
export default storesRouter;
