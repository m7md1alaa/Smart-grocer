import { Router } from "express";

import {
  createStore,
  deleteStore,
  getStoreById,
  getStoresList,
  updateStore,
} from "./controller";

const storesRouter = Router();

storesRouter.get("/", getStoresList);
storesRouter.post("/", createStore);

storesRouter.get("/:id", getStoreById);
storesRouter.put("/:id", updateStore);
storesRouter.delete("/:id", deleteStore);

export default storesRouter;
