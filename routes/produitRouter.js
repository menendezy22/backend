import express from "express";
import {
  addProduit,
  deleteProduits,
  getAllProduit,
  getOneProduitsById,
  updateProduit,
  uploadMiddleware,
} from "../controller/produitController.js";

const produitRouter = express.Router();

produitRouter.get("/produit", getAllProduit);
produitRouter.post("/produit", uploadMiddleware, addProduit);
produitRouter.delete("/produit/:id", deleteProduits);
produitRouter.get("/produit/:id", getOneProduitsById);

produitRouter.put("/produit/:id", uploadMiddleware, updateProduit);

export default produitRouter;
