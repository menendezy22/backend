import express from "express";
import {
  addCommande,
  deleteCommande,
  getAllCommande,
  getAllUserWithAllCommandsMade,
  getCommandesByUserId,
  getOneCommandeById,
  updateCommandeStatus,
  uploadMiddleware,
} from "../controller/commandesController.js";

const commandeRouter = express.Router();

commandeRouter.get("/commandes", getAllCommande);
commandeRouter.post("/commandes", addCommande);
commandeRouter.delete("/commandes/:id", deleteCommande);
commandeRouter.get("/commandes/:id", getOneCommandeById);
commandeRouter.patch("/commandes/:id/status", updateCommandeStatus);

commandeRouter.get("/allCommandesByUser", getAllUserWithAllCommandsMade);

commandeRouter.get("/commandes/user/:userId", getCommandesByUserId);

export default commandeRouter;
