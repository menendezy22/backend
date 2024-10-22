import Rendement from "../model/rendement.js";


export const addRendement = async (req, res) => {
    try {
        const { user_id, produit_id, nombre_mouvements, quantite_totale, score_rendement } = req.body;

        const rendement = new Rendement({
            user_id,
            produit_id,
            nombre_mouvements,
            quantite_totale,
            score_rendement,
        });

        const savedRendement = await rendement.save();
        res.status(201).json(savedRendement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getRendementByUser = async (req, res) => {
    try {
        const rendements = await Rendement.find({ user_id: req.params.user_id })
            .populate("user_id", "nom prenom")
            .populate("produit_id", "nom")
            .sort({ date_evaluation: -1 });

        res.status(200).json(rendements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getRendementHistory = async (req, res) => {
    try {
        const { user_id, date_debut, date_fin } = req.query;
        let filtre = {};

        if (user_id) {
            filtre.user_id = user_id;
        }

        if (date_debut && date_fin) {
            filtre.date_evaluation = {
                $gte: new Date(date_debut),
                $lte: new Date(date_fin),
            };
        } else if (date_debut) {
            filtre.date_evaluation = {
                $gte: new Date(date_debut),
            };
        }

        const historique = await Rendement.find(filtre)
            .populate("user_id", "nom prenom")
            .populate("produit_id", "nom")
            .sort({ date_evaluation: -1 });

        res.status(200).json(historique);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
