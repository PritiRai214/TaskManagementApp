import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../Services/Api';
import Navbar from '../Components/Navbar';

const categoryColors = {
  Personal: 'bg-blue-100 border-blue-300',
  Work: 'bg-green-100 border-green-300',
  Urgent: 'bg-red-100 border-red-300',
  Default: 'bg-gray-100 border-gray-300'
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchTasks();
  }, [isAuthenticated]);

  const handleEdit = (taskId) => {
    navigate(`/tasks/edit/${taskId}`);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-tr from-indigo-100 to-pink-100 p-6">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Welcome to Your Dashboard</h2>

        {!isAuthenticated ? (
          <div className="text-gray-700 text-lg">
            <p>👋 Welcome to the Task Management App!</p>
            <p className="mt-2">Please <span className="font-semibold text-indigo-600">log in</span> to view your tasks.</p>
          </div>
        ) : (
          <>
            {tasks.length === 0 ? (
              <p className="text-gray-700">You have no tasks yet. Start by creating one!</p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {tasks.map(task => {
                  const categoryClass = categoryColors[task.category] || categoryColors.Default;

                  return (
                    <div
                      key={task._id}
                      className={`p-4 border rounded-lg shadow-md ${categoryClass}`}
                    >
                      <h3 className="text-xl font-bold text-gray-800">{task.title}</h3>
                      <p className="text-gray-700 mt-1">{task.description}</p>
                      <p className="text-sm text-gray-600 mt-2">
                        Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 text-xs font-semibold text-white rounded-full bg-indigo-500">
                        {task.category || 'General'}
                      </span>
                      <button
                        onClick={() => handleEdit(task._id)}
                        className="mt-3 inline-block bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-4 py-1 rounded"
                      >
                        Edit
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Dashboard;
