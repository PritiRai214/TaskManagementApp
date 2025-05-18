// src/Pages/Login.jsx
import React, { useState } from 'react';
import API from '../Services/Api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <input className="w-full p-2 border mb-2" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" className="w-full p-2 border mb-2" name="password" placeholder="Password" onChange={handleChange} required />
      <button className="bg-green-500 text-white px-4 py-2">Login</button>
    </form>
  );
};

export default Login;
