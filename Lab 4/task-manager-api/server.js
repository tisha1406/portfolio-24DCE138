const express = require("express");

const app = express();

const PORT = 5000;

// =====================================================
// 1. JSON Middleware
// =====================================================

// Allows Express to read JSON data from POST and PUT requests.
app.use(express.json());


// =====================================================
// 2. Global Request Logging Middleware
// =====================================================

// Logs HTTP method, URL and timestamp for every request.
app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.url} - ${new Date().toISOString()}`
  );

  next();
});


// =====================================================
// 3. In-Memory Task Storage
// =====================================================

// Temporary storage for tasks.
// No database is used in Practical 4.
let tasks = [
  {
    id: 1,
    title: "Complete React Practical 3",
    completed: true
  },
  {
    id: 2,
    title: "Complete Node.js Practical 4",
    completed: false
  }
];


// =====================================================
// 4. GET /tasks
// =====================================================

// Returns all tasks.
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});


// =====================================================
// 5. POST /tasks
// =====================================================

// Creates a new task.
app.post("/tasks", (req, res) => {
  const { title, completed } = req.body;

  // Validate required title
  if (!title) {
    return res.status(400).json({
      error: "Task title is required"
    });
  }

  const newTask = {
    id: tasks.length > 0
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 1,
    title: title,
    completed: completed ?? false
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});


// =====================================================
// 6. PUT /tasks/:id
// =====================================================

// Updates an existing task.
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  // Update only the values provided by the client.
  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }

  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  res.status(200).json(task);
});


// =====================================================
// 7. DELETE /tasks/:id
// =====================================================

// Deletes an existing task.
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const taskIndex = tasks.findIndex((task) => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({
      error: "Task not found"
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1);

  res.status(200).json({
    message: "Task deleted successfully",
    task: deletedTask[0]
  });
});


// =====================================================
// 8. 404 Handler
// =====================================================

// Handles routes that do not exist.
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl
  });
});


// =====================================================
// 9. Global Error Handling Middleware
// =====================================================

// Must be placed AFTER all routes and other middleware.
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Something went wrong"
  });
});


// =====================================================
// 10. Start Server
// =====================================================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});