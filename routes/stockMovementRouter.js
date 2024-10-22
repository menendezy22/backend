import express from "express";
import { addStockMovement, getStockMovements } from "../controller/stockMovementController.js";
import { getStockHistory } from "../controller/stockHistoryController.js"; //historique du mvt de stock

const stockMovementRouter = express.Router();

stockMovementRouter.post("/", addStockMovement);
stockMovementRouter.get("/:produit_id", getStockMovements);

export default stockMovementRouter;
