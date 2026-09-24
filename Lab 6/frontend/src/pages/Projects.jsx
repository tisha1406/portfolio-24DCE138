import { useEffect, useState } from "react";
import "./Projects.css";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import Toast from "../components/Toast";

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../api";

function Projects() {
  // Task list
  const [tasks, setTasks] = useState([]);

  // Initial loading
  const [loading, setLoading] = useState(true);

  // Error message
  const [error, setError] = useState(null);

  // Toast notification
  const [toast, setToast] = useState("");

  // Create form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");

  // Editing
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriority, setEditPriority] = useState("medium");
  const [editCompleted, setEditCompleted] = useState(false);

  // Loading state for create/update/delete
  const [actionLoading, setActionLoading] = useState(null);


  // =====================================================
  // GET TASKS
  // =====================================================

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      const data = await getTasks();

      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  // Fetch tasks when page loads
  useEffect(() => {
    fetchTasks();
  }, []);


  // =====================================================
  // CREATE TASK
  // =====================================================

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setActionLoading("create");
      setError(null);

      const newTask = await createTask({
        title,
        description,
        priority,
      });

      // Update UI using backend response
      setTasks((currentTasks) => [
        ...currentTasks,
        newTask,
      ]);

      // Clear form
      setTitle("");
      setDescription("");
      setPriority("medium");

      // Show success toast
      setToast("Task created successfully");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };


  // =====================================================
  // START EDITING
  // =====================================================

  const startEditing = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
    setEditPriority(task.priority || "medium");
    setEditCompleted(task.completed || false);
  };


  // =====================================================
  // CANCEL EDIT
  // =====================================================

  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
    setEditPriority("medium");
    setEditCompleted(false);
  };


  // =====================================================
  // UPDATE TASK
  // =====================================================

  const handleUpdate = async (id) => {
    if (!editTitle.trim()) {
      setError("Task title is required.");
      return;
    }

    try {
      setActionLoading(`update-${id}`);
      setError(null);

      const updatedTask = await updateTask(id, {
        title: editTitle,
        description: editDescription,
        priority: editPriority,
        completed: editCompleted,
      });

      // Update task in local state
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task._id === id ? updatedTask : task
        )
      );

      cancelEditing();

      // Show success toast
      setToast("Task updated successfully");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };


  // =====================================================
  // DELETE TASK
  // =====================================================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setActionLoading(`delete-${id}`);
      setError(null);

      await deleteTask(id);

      // Remove deleted task from UI
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task._id !== id)
      );

      // Show success toast
      setToast("Task deleted successfully");

      setTimeout(() => {
        setToast("");
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return <Spinner />;
  }


  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="content">

      {/* Toast Notification */}
      <Toast message={toast} />

      <h1>Task Manager</h1>


      {/* Error Message */}

      {error && (
        <div>
          <ErrorMessage message={error} />

          <button
            className="retry-btn"
            onClick={fetchTasks}
          >
            Retry
          </button>
        </div>
      )}


      {/* =================================================
          CREATE TASK FORM
      ================================================= */}

      <div className="project-card">

        <h2>Create New Task</h2>

        <form onSubmit={handleCreate}>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Task description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            type="submit"
            disabled={actionLoading === "create"}
          >
            {actionLoading === "create"
              ? "Creating..."
              : "Create Task"}
          </button>

        </form>

      </div>


      {/* =================================================
          TASK LIST
      ================================================= */}

      <h2>My Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="projects-list">

          {tasks.map((task) => (

            <div
              key={task._id}
              className="project-card"
            >

              {editingId === task._id ? (

                /* ================================
                   EDIT MODE
                ================================= */

                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) =>
                      setEditTitle(e.target.value)
                    }
                  />

                  <textarea
                    value={editDescription}
                    onChange={(e) =>
                      setEditDescription(e.target.value)
                    }
                  />

                  <select
                    value={editPriority}
                    onChange={(e) =>
                      setEditPriority(e.target.value)
                    }
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>

                  <label>
                    <input
                      type="checkbox"
                      checked={editCompleted}
                      onChange={(e) =>
                        setEditCompleted(e.target.checked)
                      }
                    />

                    Completed
                  </label>

                  <button
                    onClick={() =>
                      handleUpdate(task._id)
                    }
                    disabled={
                      actionLoading ===
                      `update-${task._id}`
                    }
                  >
                    {actionLoading ===
                    `update-${task._id}`
                      ? "Updating..."
                      : "Save"}
                  </button>

                  <button
                    onClick={cancelEditing}
                  >
                    Cancel
                  </button>
                </>

              ) : (

                /* ================================
                   VIEW MODE
                ================================= */

                <>
                  <h3>{task.title}</h3>

                  <p>
                    {task.description}
                  </p>

                  <p>
                    <strong>Priority:</strong>{" "}
                    {task.priority}
                  </p>

                  <p>
                    <strong>Status:</strong>{" "}
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </p>

                  <button
                    onClick={() =>
                      startEditing(task)
                    }
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(task._id)
                    }
                    disabled={
                      actionLoading ===
                      `delete-${task._id}`
                    }
                  >
                    {actionLoading ===
                    `delete-${task._id}`
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </>
              )}

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default Projects;