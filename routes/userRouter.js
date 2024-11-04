import express from "express";
import {
  addUser,
  getAllUser,
  getUserById,
  singin,
  updateUser,
  uploadMiddleware,
} from "../controller/userController.js";

const userRouter = express.Router();

userRouter.get("/user", getAllUser);
userRouter.post("/user", uploadMiddleware, addUser);
userRouter.post("/signin", singin);
userRouter.get("/:id", getUserById);

userRouter.put("/user/:id", uploadMiddleware, updateUser);

export default userRouter;
