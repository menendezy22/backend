import express from "express";
import { createFacture, getAllFacture, getFactureById, deleteFacture, getHistoriqueFactures, filterFactures  } from "../controller/factureController.js";

const factureRouter = express.Router();

factureRouter.post("/", createFacture);
factureRouter.get("/", getAllFacture);
factureRouter.get("/:id", getFactureById);
factureRouter.delete("/:id", deleteFacture);


factureRouter.get("/historique", getHistoriqueFactures);// Route pour obtenir l'historique des factures
factureRouter.get("/filter", filterFactures);// Route pour filtrer les factures par date ou utilisateur

export default factureRouter;
