import mongoose from "mongoose";

const commandesSchema = new mongoose.Schema({
  commandes_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  date_commandes: {
    type: Date,
    default: Date.now,
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

  quantite: {
    type: Number,
    required: true,
  },

  prix_total: {
    type: Number,
    required: true,
  },

  produit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit",
    required: true,
  },
});

export default mongoose.model("commandes", commandesSchema);
