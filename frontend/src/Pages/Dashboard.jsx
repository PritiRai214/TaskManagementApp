// src/Pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../Services/Api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      if (err.response.status === 401) navigate('/login');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
      {tasks.map(task => (
        <div key={task._id} className="p-3 border mb-2 bg-white shadow-md rounded">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
