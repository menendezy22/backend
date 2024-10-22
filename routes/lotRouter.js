import express from "express";
import {
  addLot,
  deleteLot,
  getAllLot,
  uploadMiddleware,
} from "../controller/lotController.js";

const lotRouter = express.Router();

lotRouter.post("/addlot", uploadMiddleware, addLot);
lotRouter.get("/lots", getAllLot);
lotRouter.delete("/lots/:id", deleteLot);

export default lotRouter;
