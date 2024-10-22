import express from "express";
import {
  addRistourne,
  getRistournesByClient,
} from "../controller/ristourneController.js";

const ristourneRouter = express.Router();

ristourneRouter.post("/ristourne", addRistourne);
ristourneRouter.get("/:client_id", getRistournesByClient);

export default ristourneRouter;
