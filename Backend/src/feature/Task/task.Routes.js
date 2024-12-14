import express from "express";
import jwtAuth from '../../Middleware/Auth/jwtAuth.js'
import TaskController from "./task.controller.js";

const taskRouter = express.Router();
const taskController = new TaskController();

// Task route
taskRouter.post("/tasks", jwtAuth, (req, res) => taskController.createTask(req, res)); 
taskRouter.get("/tasks", jwtAuth , (req, res) => taskController.getAllTasks(req, res)); 
taskRouter.get("/tasks/:id", jwtAuth , (req, res) => taskController.getTaskById(req, res)); 
taskRouter.put("/tasks/:id", jwtAuth , (req, res) => taskController.updateTask(req, res)); 
taskRouter.delete("/tasks/:id", jwtAuth , (req, res) => taskController.deleteTask(req, res)); 

export default taskRouter;
