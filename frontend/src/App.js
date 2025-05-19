import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard"; // Adjust the path as needed
import Login from './Pages/Login';
import Register from './Pages/Register';
import TaskForm from "./Components/TaskForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/TaskForm" element={<TaskForm />} />
        {/* Add more routes here */}
      </Routes>n
    </Router>
  );
}

export default App;
