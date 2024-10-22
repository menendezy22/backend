import facture from "../model/facture.js";
import Commande from "../model/commandes.js";

export const createFacture = async (req, res) => {
    try {
        const { commande_id, num_facture } = req.body;

        const commande = await Commande.findById(commande_id);
        if (!commande) {
            return res.status(404).json({ message: "Commande non trouvée" });
        }

        const newFacture = new facture({
            commande_id,
            user_id: commande.user_id,
            num_facture,
            total_montant: commande.total_prix_commande,
        });

        const savedFacture = await newFacture.save();
        res.status(201).json({ savedFacture });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllFacture = async (req, res) => {
    try {
        const facture = await Facture.find()
            .populate("commande_id", "num_facture total_prix_commande")
            .populate("user_id", "nom prenom email");

        res.status(200).json({ facture });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFactureById = async (req, res) => {
    try {
        const facture = await Facture.findById(req.params.id)
            .populate("commande_id", "num_facture total_prix_commande")
            .populate("user_id", "nom prenom email");

        if (!facture) {
            return res.status(404).json({ message: "Facture non trouvée" });
        }

        res.status(200).json({ facture });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteFacture = async (req, res) => {
    try {
        const facture = await Facture.findByIdAndDelete(req.params.id);

        if (!facture) {
            return res.status(404).json({ message: "Facture non trouvée" });
        }

        res.status(200).json({ message: "Facture supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getHistoriqueFactures = async (req, res) => {// Obtenir toutes les factures (anaovana historique)
    try {
        const factures = await Facture.find()
            .populate("commande_id", "num_facture total_prix_commande")
            .populate("user_id", "nom prenom email")
            .sort({ date_facture: -1 }); // Trier par date décroissante

        res.status(200).json({ factures });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export const filterFactures = async (req, res) => {// Ajouter une fonction pour filtrer par date ou utilisateur @ HISTIRIQUE
    try {
        const { date_debut, date_fin, user_id } = req.query;

        let filtre = {};

        
        if (date_debut && date_fin) {// Filtrer par date
            filtre.date_facture = {
                $gte: new Date(date_debut),
                $lte: new Date(date_fin),
            };
        } else if (date_debut) {
            filtre.date_facture = { $gte: new Date(date_debut) };
        }

        
        if (user_id) {// Filtrer par utilisateur
            filtre.user_id = user_id;
        }

        const factures = await Facture.find(filtre)
            .populate("commande_id", "num_facture total_prix_commande")
            .populate("user_id", "nom prenom email")
            .sort({ date_facture: -1 });

        res.status(200).json({ factures });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
