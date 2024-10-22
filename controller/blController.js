import bl from "../model/bl.js";
import Commande from "../model/commandes.js";


export const createBl = async (req, res) => {
    try {
        const { commande_id, num_bon_livraison } = req.body;

        const commande = await Commande.findById(commande_id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        const newBl = new Bl({
            commande_id,
            user_id: commande.user_id,
            num_bon_livraison,
        });

        const savedBl = await newBl.save();
        res.status(201).json({ savedBl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllBl = async (req, res) => {
    try {
        const bl = await Bl.find()
            .populate("commande_id", "num_facture total_prix_commande")
            .populate("user_id", "nom prenom email");

        res.status(200).json({ bl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlById = async (req, res) => {
    try {
        const bl = await Bl.findById(req.params.id)
            .populate("commande_id", "num_facture total_prix_commande")
            .populate("user_id", "nom prenom email");

        if (!bl) {
            return res.status(404).json({ message: "Bon de livraison non trouvé" });
        }

        res.status(200).json({ bl });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBl = async (req, res) => {
    try {
        const bl = await Bl.findByIdAndDelete(req.params.id);

        if (!bl) {
            return res.status(404).json({ message: "Bon de livraison non trouvé" });
        }

        res.status(200).json({ message: "Bon de livraison supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
