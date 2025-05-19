import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Dashboard"; // Adjust the path as needed

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add more routes here */}
      </Routes>n
    </Router>
  );
}

export default App;
