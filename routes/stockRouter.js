import express from "express";
import { updateStock, getStock } from "../controller/stockController.js";

const stockRouter = express.Router();

stockRouter.put("/", updateStock);
stockRouter.get("/:produit_id", getStock);

export default stockRouter;
