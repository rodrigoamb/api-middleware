import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const userRoutes = Router();

userRoutes.get("/", authMiddleware, userController.getUser);

export default userRoutes;
