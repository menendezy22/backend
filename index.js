import express from "express";
import dotenv from "dotenv";
dotenv.config();
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import clientRouter from "./routes/clientRouter.js";
import lotRouter from "./routes/lotRouter.js";
import louerRouter from "./routes/louerRouter.js";
import produitRouter from "./routes/produitRouter.js";
import userRouter from "./routes/userRouter.js";
import commandeRouter from "./routes/commandeRouter.js";
import factureRouter from "./routes/factureRouter.js";
import blRouter from "./routes/blRouter.js";
import stockRouter from "./routes/stockRouter.js";
import stockMovementRouter from "./routes/stockMovementRouter.js";
import rendementRouter from "./routes/rendementRouter.js";
import ristourneRouter from "./routes/ristourneRouter.js";
import alerteStockRouter from "./routes/alerteStockRouter.js";
import stockHistoryRouter from "./routes/stockHistoryRoute.js";

const app = express();

app.use(bodyParser.json());

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/DatabaseProjet", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

app.use("/api/client", clientRouter);
app.use("/api/lot", lotRouter);
app.use("/api/loyer", louerRouter);
app.use("/api/produit", produitRouter);
app.use("/api/user", userRouter);
app.use("/api/commande",  commandeRouter);
app.use("/api/facture", factureRouter);
app.use("/api/bl", blRouter);
app.use("/api/stock", stockRouter);
app.use("/api/stockMovement", stockMovementRouter);
app.use("/api/stockHistory", stockMovementRouter);
app.use("/api/rendement", rendementRouter);
app.use("/api/ristourne", ristourneRouter);
app.use("/api/alerteStock", alerteStockRouter);
app.use("/api/stock-history", stockHistoryRouter);


app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connect();
  console.log(`Server running at http://localhost:${PORT}`);
});
