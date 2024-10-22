import express from "express";
import {
  deleteClient,
  getAllClient,
  getOneClient,
  signin,
  signUp,
  updateClient,
  uploadMiddleware,
} from "../controller/clientController.js";

const clientRouter = express.Router();

clientRouter.post("/signup", uploadMiddleware, signUp);
clientRouter.post("/signin", signin);
clientRouter.get("/clients", getAllClient);
clientRouter.delete("/clients/:id", deleteClient);
clientRouter.get("/clients/:id", getOneClient);
clientRouter.post("/edit", uploadMiddleware, updateClient);

export default clientRouter;
