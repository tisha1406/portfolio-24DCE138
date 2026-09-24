# Practical 6 – Full Stack Task Manager

React + Node.js + Express + MongoDB

## Objective

To integrate a React frontend with a Node.js/Express backend and MongoDB database to build a complete full-stack Task Management application.

## Technologies Used

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS
- Fetch API

### Backend

- Node.js
- Express.js
- Mongoose
- MongoDB
- CORS
- dotenv

## Project Structure

```text
Lab 6/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   │   └── Task.js
│   │
│   ├── server.js
│   ├── package.json
│   ├── .env
│   └── .env.example
│
├── .gitignore
└── README.md
Features
View all tasks
Create a new task
Update an existing task
Delete a task
Set task priority
Mark tasks as completed
Store tasks permanently in MongoDB
Loading state handling
Error handling
Success notifications
Delete confirmation
React and Express integration using REST API
CORS configuration for frontend-backend communication
Backend API

The backend runs on:

http://localhost:5000
Get All Tasks
GET /tasks

Returns all tasks stored in MongoDB.

Get One Task
GET /tasks/:id

Returns a single task using its MongoDB ID.

Create a Task
POST /tasks

Example request body:

{
  "title": "Complete Practical 6",
  "description": "Connect React with Node and MongoDB",
  "priority": "high"
}
Update a Task
PUT /tasks/:id

Example request body:

{
  "title": "Complete Practical 6",
  "description": "Full stack integration completed",
  "priority": "high",
  "completed": true
}
Delete a Task
DELETE /tasks/:id

Deletes the task using its MongoDB ID.

How to Run

Two terminals are required because the frontend and backend run separately.

Terminal 1 – Backend

Open a terminal inside the backend folder:

cd backend
npm install
node server.js

The backend will run on:

http://localhost:5000

Make sure MongoDB is running and the backend/.env file contains:

MONGO_URI=mongodb://127.0.0.1:27017/task_manager
Terminal 2 – Frontend

Open another terminal inside the frontend folder:

cd frontend
npm install
npm run dev

The frontend will normally run on:

http://localhost:5173
Full Stack Flow
React Frontend
      |
      | fetch()
      v
Express REST API
      |
      | Mongoose
      v
MongoDB
      |
      | JSON response
      v
React UI
CRUD Flow
Create
React Form
    |
    v
POST /tasks
    |
    v
MongoDB
    |
    v
Updated React UI
Read
React Page
    |
    v
GET /tasks
    |
    v
MongoDB
    |
    v
Task List
Update
Edit Task
    |
    v
PUT /tasks/:id
    |
    v
MongoDB
    |
    v
Updated Task
Delete
Delete Button
    |
    v
DELETE /tasks/:id
    |
    v
MongoDB
    |
    v
Task Removed From UI
Practical 6 Requirements Covered
React frontend connected to Express backend
CORS configured
REST API calls using Fetch API
Create operation
Read operation
Update operation
Delete operation
MongoDB persistence
Loading states
Error handling
UI synchronization after API operations
Testing

The application was tested using:

Browser
Postman
MongoDB
MongoDB Compass

The complete CRUD flow was verified:

Create → View → Update → Delete → Refresh

Data remains available after refreshing the browser because tasks are stored in MongoDB.

Author

Tisha Soni

B.Tech Computer Engineering