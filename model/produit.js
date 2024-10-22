import mongoose from "mongoose";

const ProduitSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  quantite: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Produit", ProduitSchema);
