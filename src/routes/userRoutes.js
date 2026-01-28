import { Router } from "express";
import userController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.get("/", userController.getUser);

export default userRoutes;
