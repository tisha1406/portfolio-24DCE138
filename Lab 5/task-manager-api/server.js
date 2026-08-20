const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();

const PORT = 5000;


// =====================================================
// 1. JSON Middleware
// =====================================================

app.use(express.json());


// =====================================================
// 2. Request Logging Middleware
// =====================================================

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} - ${new Date().toISOString()}`
  );

  next();
});


// =====================================================
// 3. Content-Type Validation Middleware
// =====================================================

// POST and PUT requests must use application/json.
app.use((req, res, next) => {
  if (req.method === "POST" || req.method === "PUT") {
    const contentType = req.headers["content-type"];

    if (!contentType || !contentType.includes("application/json")) {
      return res.status(415).json({
        error: "Content-Type must be application/json"
      });
    }
  }

  next();
});


// =====================================================
// 4. Task ID Validation Middleware
// =====================================================

// Validates MongoDB ObjectId format.
const validateTaskId = (req, res, next) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      error: "Invalid task ID"
    });
  }

  next();
};


// =====================================================
// 5. GET /tasks
// Get all tasks
// =====================================================

app.get("/tasks", async (req, res, next) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
});


// =====================================================
// 6. GET /tasks/:id
// Get a single task
// =====================================================

app.get("/tasks/:id", validateTaskId, async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});


// =====================================================
// 7. POST /tasks
// Create a new task
// =====================================================

app.post("/tasks", async (req, res, next) => {
  try {
    const task = await Task.create(req.body);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
});


// =====================================================
// 8. PUT /tasks/:id
// Update an existing task
// =====================================================

app.put("/tasks/:id", validateTaskId, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
});


// =====================================================
// 9. DELETE /tasks/:id
// Delete an existing task
// =====================================================

app.delete("/tasks/:id", validateTaskId, async (req, res, next) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({
        error: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully",
      task: task
    });
  } catch (error) {
    next(error);
  }
});


// =====================================================
// 10. Structured 404 Handler
// =====================================================

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});


// =====================================================
// 11. Global Error Handler
// =====================================================

app.use((err, req, res, next) => {
  console.error(err);

  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map(
      (error) => error.message
    );

    return res.status(400).json({
      error: "Validation failed",
      messages: messages
    });
  }

  // Invalid MongoDB ObjectId
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid task ID"
    });
  }

  // Generic server error
  res.status(500).json({
    error: "Something went wrong"
  });
});


// =====================================================
// 12. MongoDB Connection
// =====================================================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(
        `Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((error) => {
    console.error(
      "MongoDB connection failed:",
      error.message
    );
  });