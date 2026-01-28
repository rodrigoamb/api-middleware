import { Router } from "express";
import taskController from "../controllers/taskController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const taskRoutes = Router();

taskRoutes.get("/getalltasks", authMiddleware, taskController.getAllTasks);
taskRoutes.get("/getatask/:id", authMiddleware, taskController.getTaskById);
taskRoutes.post("/createanewtask", authMiddleware, taskController.createTask);
taskRoutes.put("/updatetask/:id", authMiddleware, taskController.updateTask);
taskRoutes.delete("/deletetask/:id", authMiddleware, taskController.deleteTask);

export default taskRoutes;
