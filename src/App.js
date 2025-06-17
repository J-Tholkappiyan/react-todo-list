import React, { useState } from "react";
import "./index.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [deletedTask, setDeletedTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTask = (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTask("");
  };

  const handleDeleteTask = (id) => {
    const taskToDelete = tasks.find((t) => t.id === id);
    setDeletedTask(taskToDelete);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleUndoDelete = () => {
    if (deletedTask) {
      setTasks([...tasks, deletedTask]);
      setDeletedTask(null);
    }
  };

  const handleDeleteAll = () => {
    setTasks([]);
    setDeletedTask(null);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>To-Do List</h1>

      <form onSubmit={handleAddTask} className="todo-form">
        <input
          type="text"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {filteredTasks.map((task) => (
        <div key={task.id} className={`todo-item`}>
          <div className="todo-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)} // Marks task as completed (strikes it)
            />
            <span
              className={task.completed ? "completed" : ""}
            >
              {task.text}
            </span>
          </div>
          <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
        </div>
      ))}

      <div className="action-buttons">
        <button onClick={handleUndoDelete} disabled={!deletedTask}>
          Undo Delete
        </button>
        <button onClick={handleDeleteAll} disabled={tasks.length === 0}>
          Delete All
        </button>
      </div>
    </div>
  );
}

export default App;
