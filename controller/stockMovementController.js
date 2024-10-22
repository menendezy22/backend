import Stock from "../model/stock.js";
import StockMovement from "../model/stockMovement.js";


export const addStockMovement = async (req, res) => {// stock (entrée ou sortie)
    try {
        const { produit_id, type_mouvement, quantite, description } = req.body;

        
        const stock = await Stock.findOne({ produit_id });// Vérifier si le stock existe pour ce produit
        if (!stock) {
            return res.status(404).json({ message: "Stock non trouvé pour ce produit" });
        }

        
        const stockMovement = new StockMovement({// Créer un nouveau mouvement de stock
            produit_id,
            type_mouvement,
            quantite,
            description,
        });

        
        if (type_mouvement === "entrée") {// maj stock
            stock.quantite_disponible += quantite;
        } else if (type_mouvement === "sortie") {
            if (stock.quantite_disponible < quantite) {
                return res.status(400).json({ message: "Quantité insuffisante en stock" });
            }
            stock.quantite_disponible -= quantite;
        }

        await stock.save();
        const savedMovement = await stockMovement.save();
        res.status(201).json({ savedMovement, stock });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getStockMovements = async (req, res) => {// Obtenir tous les mouvements de stock
    try {
        const movements = await StockMovement.find({ produit_id: req.params.produit_id })
            .populate("produit_id", "nom")
            .sort({ date_mouvement: -1 });

        res.status(200).json(movements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
