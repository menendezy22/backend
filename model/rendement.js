import mongoose from "mongoose";

const rendementSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    produit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produit",
        required: false,
    },
    nombre_mouvements: { // Nombre total de mouvements de stock par l'utilisateur
        type: Number,
        required: true,
        default: 0,
    },
    quantite_totale: { // Quantité totale manipulée par l'utilisateur
        type: Number,
        required: true,
        default: 0,
    },
    score_rendement: { // Score basé sur des critères de performance
        type: Number,
        required: true,
        default: 0,
    },
    date_evaluation: { // Date de l'enregistrement du rendement
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Rendement", rendementSchema);
