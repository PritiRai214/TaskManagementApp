import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Services/Api';
import Navbar from '../Components/Navbar';

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

  // Navigate to edit page for the selected task
  const handleEdit = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
        {tasks.length === 0 && <p>No tasks found.</p>}

        {tasks.map(task => (
          <div key={task._id} className="p-3 border mb-2 bg-white shadow-md rounded flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
              </p>
            </div>
            <button
              onClick={() => handleEdit(task._id)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
