import express from "express";
import { getStockHistory } from "../controller/stockHistoryController.js"; // Importer le contrôleur

const stockHistoryRouter = express.Router(); // Créer un routeur

// Définir la route pour obtenir l'historique des mouvements de stock
stockHistoryRouter.get("/", getStockHistory); 

export default stockHistoryRouter; // Exporter le routeur
