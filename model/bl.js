import mongoose from "mongoose";

const blSchema = new mongoose.Schema({
    commande_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "commandes",
        required: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    num_ba: {
        type: String,
        required: true,
        unique: true,
    },
    date_ba: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ["pending", "delivered", "canceled"],
        default: "pending",
    },
});

export default mongoose.model("BaNote", blSchema);
