import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(${API_BASE_URL}/api/signin`, { email, password });
      setMessage(response.data.message);
      // Redirect to dashboard or home page after sign in
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } catch (error) {
      console.error('Sign in error:', error.response?.data);
      setMessage(error.response?.data.message || 'Sign in failed.');
    }
  };

  const handleForgotPassword = () => {
    // Navigate to the Forgot Password page
    navigate('/forgot-password');
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <form onSubmit={handleSignIn}>
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
          Sign In
        </button>
      </form>
      <button
        onClick={handleForgotPassword}
        className="mt-4 text-blue-500 underline text-center w-full"
      >
        Forgot Password?
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default SignIn;
