import express from "express";
import {
  addUser,
  getAllUser,
  singin,
  uploadMiddleware,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/user", getAllUser);
userRouter.post("/user", uploadMiddleware, addUser);
userRouter.post("/signin", singin);

export default userRouter;
