import mongoose from "mongoose";

const LotSchema = new mongoose.Schema({
  designLot: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isOccuped: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model("Lot", LotSchema);
