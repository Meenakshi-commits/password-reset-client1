import React, { useState } from 'react';
import axios from 'axios';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to the sign in endpoint
      const response = await axios.post('http://localhost:5000/api/signin', { email, password });
      setMessage(response.data.message);
      // Optionally, redirect the user or store authentication token here
    } catch (error) {
      console.error('Sign in error:', error.response?.data);
      setMessage(error.response?.data.message || 'Sign in failed.');
    }
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
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}

export default SignIn;
