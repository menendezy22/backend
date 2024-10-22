import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
  nom: {
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
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Client", ClientSchema);
