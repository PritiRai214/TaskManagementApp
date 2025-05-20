// src/Pages/Register.jsx
import React, { useState } from 'react';
import API from '../Services/Api';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Components/Navbar";

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      console.log('Sending registration data:', form);
      const res = await API.post('/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-200 p-6 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />

          <label className="block mb-2 text-sm font-medium">Email</label>
          <input
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />

          <label className="block mb-2 text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />

          <label className="block mb-2 text-sm font-medium">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded mb-4 focus:outline-none focus:ring focus:ring-blue-200"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            required
          />

          <button
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
