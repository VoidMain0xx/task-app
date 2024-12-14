import { ObjectId } from "mongodb";
import { getDb } from "../../config/connectToMongoDB.js";

class TaskRepository {
  constructor() {
    this.collection = "tasks";
  }

  async createTask(taskData) {
    try {
      const db = getDb();  // Get the database connection
      const collection = db.collection(this.collection);  // Get the appropriate collection
      const result = await collection.insertOne(taskData);  // Insert the task
      return result  // Return the inserted task document
    } catch (error) {
      console.error("Error in createTask:", error);
      throw new Error("Failed to create task");  // Throw a custom error message
    }
  }
  

  async getAllTasks() {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (error) {
      console.error("Error in getAllTasks:", error);
      throw error;
    }
  }

  async getTaskById(taskId) {
    try {
      const db = getDb(); // Assume this retrieves the MongoDB database instance
      const collection = db.collection(this.collection);
  
      // Validate and convert the taskId to ObjectId
      if (!ObjectId.isValid(taskId)) {
        throw new Error(`Invalid taskId: ${taskId}`);
      }
      const objectId = new ObjectId(taskId);
  
      // Query the collection for the task
      const task = await collection.findOne({ _id: objectId });
  
      // Return the task if found
      return task;
    } catch (error) {
      console.error("Error in getTaskById:", error);
      throw error; // Rethrow to handle it in the calling function
    }
  }

  async updateTask(taskId, updates) {
    try {
      const db = getDb();
      const collection = db.collection(this.collection);
      const result = await collection.findOneAndUpdate(
        { _id: taskId },
        { $set: updates },
        { returnOriginal: false }
      );
      return result.value;
    } catch (error) {
      console.error("Error in updateTask:", error);
      throw error;
    }
  }

  async deleteTask(taskId) {
    try {
      const db = getDb(); // Assuming getDb() correctly connects to the database
      const collection = db.collection(this.collection);
  
      // Validate and convert taskId to ObjectId
      if (!ObjectId.isValid(taskId)) {
        throw new Error(`Invalid taskId: ${taskId}`);
      }
      const objectId = new ObjectId(taskId);
  
      // Use findOneAndDelete to delete the document
      const result = await collection.findOneAndDelete({ _id: objectId });
  
      if (!result.value) {
        console.error(`deleteTask: Task with ID ${taskId} not found`);
        return null; // Task not found
      }
  
      console.info(`deleteTask: Task with ID ${taskId} deleted successfully`);
      return result.value; // Returning the deleted document
    } catch (error) {
      console.error("Error in deleteTask:", error);
      throw error; // Re-throwing the error for the calling function to handle
    }
}

}

export default TaskRepository;
