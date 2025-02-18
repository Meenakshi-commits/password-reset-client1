import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import.meta.env 

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
      const response = await axios.post(`${API_BASE_URL}/api/users`, { email, password });
      setMessage(response.data.message);
      // After a successful registration, wait a few seconds then redirect
      setTimeout(() => {
        navigate('/signin');
      }, 2000); // 2-second delay (adjust as needed)
    } catch (error) {
      console.error('Registration error:', error.response?.data);
      setMessage(error.response?.data.message || 'Error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Register
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default Register;
