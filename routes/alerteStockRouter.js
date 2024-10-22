import express from "express";
import { checkStockForAlerts, getAlertesStock, deleteAlerteStock } from "../controller/alerteStockController.js";

const alerteStockRouter = express.Router();


alerteStockRouter.get("/check-stock", checkStockForAlerts);
alerteStockRouter.get("/alertes", getAlertesStock);
alerteStockRouter.delete("/alertes/:produit_id", deleteAlerteStock);

export default alerteStockRouter;
