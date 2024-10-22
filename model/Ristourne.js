import mongoose from "mongoose";

const ristourneSchema = new mongoose.Schema({
  commande_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commande",
    required: true,
  },
  remise: {
    type: Number,
    required: true,
  },

  date_creation: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Ristourne", ristourneSchema);
