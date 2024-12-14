import mongoose from "mongoose";

// Define Task Schema
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      unique: true,
    },

    description: {
      type: String,
      default: "No description",
    },

    dueDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      require : true
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create and Export Task Model
const TaskModel = mongoose.model("Task", TaskSchema);

export default TaskModel;
