import { Router } from "express";
import taskController from "../controllers/taskController.js";

const taskRoutes = Router();

taskRoutes.get("/getalltasks", taskController.getAllTasks);
taskRoutes.get("/getatask/:id", taskController.getTaskById);
taskRoutes.post("/createanewtask", taskController.createTask);
taskRoutes.put("/updatetask/:id", taskController.updateTask);
taskRoutes.delete("/deletetask/:id", taskController.deleteTask);

export default taskRoutes;
