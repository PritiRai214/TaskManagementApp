// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Services/Api';
import Navbar from '../Components/Navbar'; // ✅ Import Navbar

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate('/login');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      <Navbar /> {/* ✅ Include Navbar here */}
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
        {tasks.map(task => (
          <div key={task._id} className="p-3 border mb-2 bg-white shadow-md rounded">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="text-sm text-gray-500">
              Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
