import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    produit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produit",
        required: true,
    },
    quantite_disponible: {
        type: Number,
        required: true,
        default: 0,
    },
});

export default mongoose.model("Stock", stockSchema);
