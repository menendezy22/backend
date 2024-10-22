import AlerteStock from "../model/alerteStock.js";
import Stock from "../model/stock.js";


export const createAlerteStock = async (produit_id, quantite_disponible) => {// Fonction pour créer une alerte pour un produit spécifique
    try {
        const alerteExistante = await AlerteStock.findOne({ produit_id });

        
        if (!alerteExistante && quantite_disponible <= 0) {// Vérifier si une alerte existe déjà pour ce produit
            const nouvelleAlerte = new AlerteStock({
                produit_id,
                quantite_disponible,
            });

            await nouvelleAlerte.save();
        }
    } catch (error) {
        console.error("Erreur lors de la création de l'alerte de stock :", error.message);
    }
};


export const checkStockForAlerts = async (req, res) => {// Fonction pour vérifier le stock et créer des alertes si nécessaire
    try {
        const stocks = await Stock.find();

        stocks.forEach(async (stock) => {
            if (stock.quantite_disponible <= 0) {
                await createAlerteStock(stock.produit_id, stock.quantite_disponible);
            }
        });

        res.status(200).json({ message: "Vérification des stocks terminée. Alertes créées si nécessaire." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAlertesStock = async (req, res) => {// Fonction pour obtenir toutes les alertes de stock
    try {
        const alertes = await AlerteStock.find().populate("produit_id", "nom");

        if (alertes.length === 0) {
            return res.status(200).json({ message: "Aucune alerte de stock pour le moment." });
        }

        res.status(200).json(alertes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteAlerteStock = async (req, res) => {// Supprimer une alerte (par exemple après réapprovisionnement)
    try {
        const { produit_id } = req.params;
        const alerte = await AlerteStock.findOneAndDelete({ produit_id });

        if (!alerte) {
            return res.status(404).json({ message: "Aucune alerte trouvée pour ce produit." });
        }

        res.status(200).json({ message: "Alerte de stock supprimée." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
