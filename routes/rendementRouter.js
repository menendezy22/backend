import express from "express";
import { addRendement, getRendementByUser, getRendementHistory } from "../controller/rendementController.js";

const rendementRouter = express.Router();


rendementRouter.post("/", addRendement);
rendementRouter.get("/:user_id", getRendementByUser);
rendementRouter.get("/history", getRendementHistory);

export default rendementRouter;
