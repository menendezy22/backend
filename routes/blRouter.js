import express from "express";
import { createBl, getAllBl, getBlById, deleteBl } from "../controller/blController.js";

const blRouter = express.Router();

blRouter.post("/", createBl);
blRouter.get("/", getAllBl);
blRouter.get("/:id", getBlById);
blRouter.delete("/:id", deleteBl);

export default blRouter;
