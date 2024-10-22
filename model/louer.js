import mongoose from "mongoose";

const LouerSchema = new mongoose.Schema({
  idCli: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true,
  },
  idLot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lot",
    required: true,
  },
  loyer: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Louer", LouerSchema);
