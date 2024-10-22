import mongoose from "mongoose";

const stockMovementSchema = new mongoose.Schema({
    produit_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produit",
        required: true,
    },
    type_mouvement: {
        type: String,
        enum: ["entrée", "sortie"],
        required: true,
    },
    quantite: {
        type: Number,
        required: true,
        min: 1,
    },
    date_mouvement: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: false,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: false,
    },
});

export default mongoose.model("StockMovement", stockMovementSchema);
