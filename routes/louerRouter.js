import express from "express";
import { addLoyer, getAllLouer } from "../controller/louerController.js";

const louerRouter = express.Router();

louerRouter.get("/loyers", getAllLouer);
louerRouter.post("/loyers", addLoyer);

export default louerRouter;
