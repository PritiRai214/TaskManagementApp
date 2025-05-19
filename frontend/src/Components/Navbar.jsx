// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
      <Link to="/Login" style={{ marginRight: "1rem" }}>Login</Link>
      <Link to="/Register" style={{ marginRight: "1rem" }}>Register</Link>
      <Link to="/create">New Task</Link>
    </nav>
  );
}

export default Navbar;
