import * as z from "zod";

export const createProductSchema = z.object({
  ProductTitle: z.string().min(1, "Product title is required"),
  description: z.string().optional(),
  barcode: z.string().optional(),
  stores: z
    .array(
      z.object({
        storeId: z.number(),
        price: z.number(),
      })
    )
    .optional(),
  // categories and Stores can be passed as needed
});

export const ProductUpdateSchema = z.object({
  ProductId: z.number().int().positive(),
  ProductTitle: z.string().min(1, "product new name is required"),
  description: z.string().optional(),
  Barcodes: z.number().optional(),
  Prices: z.number(),
  StoreId: z.string(),
});

const ProductSchema = z.object({
  ProductId: z.number(),
  ProductTitle: z.string(),
  description: z.string(),
  Barcodes: z.number(),
  Prices: z.number(),
  // categories:z.enum([categories]),
  Stores: z.string(),
  StoreId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});
