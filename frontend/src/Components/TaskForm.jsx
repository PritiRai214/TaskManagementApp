import React, { useState, useEffect } from "react";
import API from "../Services/Api"; // Adjust the import path as needed
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function TaskForm({ initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dueDate, setDueDate] = useState(
    initialData.dueDate ? initialData.dueDate.slice(0, 10) : ""
  );
  const [category, setCategory] = useState(initialData.category || "Personal");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setDueDate(initialData.dueDate ? initialData.dueDate.slice(0, 10) : "");
    setCategory(initialData.category || "Personal");
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // If editing, do PUT; else POST
      if (initialData._id) {
        await API.put(`/tasks/${initialData._id}`, {
          title,
          description,
          dueDate,
          category,
        });
        alert("Task updated successfully!");
      } else {
        await API.post("/tasks", {
          title,
          description,
          dueDate,
          category,
        });
        alert("Task created successfully!");
      }
      // After successful submission, reset or redirect
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to save task. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">{initialData._id ? "Edit Task" : "Create Task"}</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}
      {loading && <p className="text-blue-600 mb-4">Saving...</p>}

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="title">
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium" htmlFor="dueDate">
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-1 font-medium" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {initialData._id ? "Update Task" : "Save Task"}
      </button>
    </form>
    </>
  );
}

export default TaskForm;
