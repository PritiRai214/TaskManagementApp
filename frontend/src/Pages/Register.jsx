// src/Pages/Register.jsx
import React, { useState } from 'react';
import API from '../Services/Api';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await API.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="w-full p-2 border mb-2" name="name" placeholder="Name" onChange={handleChange} required />
      <input className="w-full p-2 border mb-2" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" className="w-full p-2 border mb-2" name="password" placeholder="Password" onChange={handleChange} required />
      <button className="bg-blue-500 text-white px-4 py-2">Register</button>
    </form>
  );
};

export default Register;
