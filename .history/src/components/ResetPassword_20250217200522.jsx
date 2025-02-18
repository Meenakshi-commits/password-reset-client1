import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, verify the token when the component mounts
    const verifyToken = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/verify-token?token=${token}`);
        if (!response.data.valid) {
          setMessage('Invalid or expired token.');
        }
      } catch (error) {
        console.error('Token verification error:', error.response?.data);
        setMessage('Error verifying token.');
      }
    };

    if (token) {
      verifyToken();
    } else {
      setMessage('No token provided.');
    }
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/reset-password', { token, password });
      setMessage(response.data.message);
      // Redirect to sign-in page after successful password reset
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error('Reset password error:', error.response?.data);
      setMessage(error.response?.data.message || 'Error occurred. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      {!message.includes('success') && (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full p-2 border rounded mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full p-2 border rounded mb-4"
            value={confirmPassword
::contentReference[oaicite:0]{index=0}
 
