import * as z from "zod";
const ProductSchema = z.object({
  ProductId: z.number(),
  ProductTitle: z.string(),
  description: z.string(),
  Barcodes:z.number(),
  Prices:z.number(),
  // categories:z.enum([categories]),
  Stores:z.string(),
  StoreId:z.string(),
  createdAt:z.date(),
  updatedAt:z.date(),
});

type ProductType = z.infer<typeof ProductSchema>;