import Stock from "../model/stock.js";
//import stockMovement from "../model/stockMovement.js";
import Produit from "../model/produit.js";

export const updateStock = async (req, res) => {// Ajouter ou mettre à jour le stock d'un produit

    try {
        const { produit_id, quantite_disponible } = req.body;

        
        const produit = await Produit.findById(produit_id);// Vérifie si le produit existe
        if (!produit) {
            return res.status(404).json({ message: "Produit non trouvé" });
        }

        
        const stock = await Stock.findOneAndUpdate(// maj ou cree le stock pour ce produit
            { produit_id },
            { quantite_disponible },
            { new: true, upsert: true } // Crée un nouveau stock s'il n'existe pas
        );

        res.status(200).json({ stock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getStock = async (req, res) => {// Obtenir le stock
    try {
        const stock = await Stock.find({ produit_id: req.params.produit_id }).populate("produit_id", "nom");
        if (!stock) {
            return res.status(404).json({ message: "Stock non trouvé pour ce produit" });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
