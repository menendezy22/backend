import mongoose from "mongoose";

const alerteStockSchema = new mongoose.Schema({
    produit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produit",
        required: true,
    },
    quantite_disponible: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        default: "nous avons une rupture de stosk.",
    },
    date_alerte: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("AlerteStock", alerteStockSchema);
