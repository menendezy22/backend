import StockMovement from "../model/stockMovement.js"; // Importer le modèle de mouvement de stock

export const getStockHistory = async (req, res) => {
    try {
        const { produit_id, user_id, date_debut, date_fin } = req.query;

        let filtre = {};

        if (produit_id) {
            filtre.produit_id = produit_id;
        }

        if (user_id) {
            filtre.user_id = user_id;
        }

        if (date_debut && date_fin) {
            filtre.date_mouvement = {
                $gte: new Date(date_debut),
                $lte: new Date(date_fin),
            };
        } else if (date_debut) {
            filtre.date_mouvement = {
                $gte: new Date(date_debut),
            };
        }

        const mouvements = await StockMovement.find(filtre)
            .populate("produit_id", "nom")
            .populate("user_id", "nom prenom email")
            .sort({ date_mouvement: -1 });

        res.status(200).json(mouvements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
