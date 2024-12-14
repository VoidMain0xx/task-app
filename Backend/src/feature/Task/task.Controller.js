import TaskRepository from "./task.Repository.js";
import { ObjectId } from "mongodb";

export default class TaskController {
  constructor() {
    this.TaskRepository = new TaskRepository();
  }

  async createTask(req, res) {
    try {
      const { title, description, dueDate, status, completed, priority, user } = req.body;

      if (!title || !user) {
        return res.status(400).send({ error: "Title and user are required" });
      }

      const newTask = { title, description, dueDate, status, completed, priority, user };
      const task = await this.TaskRepository.createTask(newTask);

      res.status(201).send({ message: "Task created successfully", task });
    } catch (error) {
      console.error("Error in createTask:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  async getAllTasks(req, res) {
    try {
      const tasks = await this.TaskRepository.getAllTasks();
      res.status(200).send({ message: "Tasks retrieved successfully", tasks });
    } catch (error) {
      console.error("Error in getAllTasks:", error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
  
      if (!id || !Object.keys(updates).length) {
        return res.status(400).json({ error: "Task ID and updates are required" });
      }
  
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid Task ID format" });
      }
      const objectId = new ObjectId(id);
      const task = this.TaskRepository.getTaskById(id)
  
      if(task){
      const updatedTask = await this.TaskRepository.updateTask(objectId, updates);
      return res.status(200).json({ message: "Task updated successfully", updatedTask });
      }

      if (!updatedTask) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      
    } catch (error) {
      console.error("Error in updateTask:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
  
      if (!id) {
        console.error("deleteTask: Missing task ID in request parameters");
        return res.status(400).json({ error: "Task ID is required" });
      }
  
      const task = await this.TaskRepository.getTaskById(id);
      if (!task) {
        console.error(`deleteTask: Task with ID ${id} not found`);
        return res.status(404).json({ error: "Task not found" });
      }
  
      await this.TaskRepository.deleteTask(id);
      console.info(`deleteTask: Task with ID ${id} deleted successfully`);
  
      return res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("deleteTask: Internal server error", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
