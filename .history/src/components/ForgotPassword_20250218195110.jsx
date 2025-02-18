import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Forgot password error:', error.response?.data);
      setMessage(error.response?.data.message || 'Error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Send Reset Link
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default ForgotPassword;
