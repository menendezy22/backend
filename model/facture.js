import mongoose from "mongoose";

const factureSchema = new mongoose.Schema({
  commandes_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "commandes",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  num_facture: {
    type: String,
    required: true,
  },
  total_montant: {
    type: Number,
    required: true,
    min: 0,
  },
  date_facture: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Facture", factureSchema);

//pour l'historique de facture ceci est suffiasnt
