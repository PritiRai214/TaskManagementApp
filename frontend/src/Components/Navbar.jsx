import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const linkBase = "text-blue-600 hover:text-blue-800 transition";

  const activeLink = "font-bold text-indigo-700";

  return (
    <nav className="bg-gray-100 p-4 flex justify-between items-center shadow-md">
      <div className="space-x-4">
        {!token ? (
          <>
           <Link to="/dashboard" className={`${linkBase} ${isActive('/dashboard') ? activeLink : ''}`}>Dashboard</Link>
            <Link to="/login" className={`${linkBase} ${isActive('/login') ? activeLink : ''}`}>Login</Link>
            <Link to="/register" className={`${linkBase} ${isActive('/register') ? activeLink : ''}`}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" className={`${linkBase} ${isActive('/dashboard') ? activeLink : ''}`}>Dashboard</Link>
            <Link to="/taskform" className={`${linkBase} ${isActive('/taskform') ? activeLink : ''}`}>Create Task</Link>
          </>
        )}
      </div>
      {token && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      )}
    </nav>
  );
}

export default Navbar;
