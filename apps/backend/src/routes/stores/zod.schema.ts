import * as z from "zod";

// Define a schema for creating a new store
export const StoreCreateSchema = z.object({
  StoreName: z.string().min(1, "Store name is required"), // Required field for creating a store
});

export const StoreUpdateSchema = z.object({
  StoreId: z.number().int().positive(),
  StoreName: z.string().min(1, "Store new name is required"), // the new name for the store
});


export const StoreSchema = z.object({
  StoreId: z.number().int().positive(),
  StoreName: z.string().min(1, "Store name is required"),
  Products: z
    .array(
      z.object({
        ProductId: z.string(),
      })
    )
    .optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
