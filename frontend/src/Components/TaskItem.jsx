// src/components/TaskItem.js
import React from "react";

function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginBottom: "0.5rem" }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.completed ? "✅ Completed" : "❌ Incomplete"}</p>
      <button onClick={() => onEdit(task)}>Edit</button>
      <button onClick={() => onDelete(task._id)} style={{ marginLeft: "0.5rem" }}>
        Delete
      </button>
    </div>
  );
}

export default TaskItem;
