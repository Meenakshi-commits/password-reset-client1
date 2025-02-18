import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ResetPassword() {
  const query = new URLSearchParams(useLocation().search);
  const token = query.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Optionally, verify the token when the component mounts
    const verifyToken = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
        const response = await axios.get(`${API_BASE_URL}/api/verify-token?token=${token}`);
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
    setIsLoading(true);
    setMessage('');

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      setIsLoading(false);
      return;
    }

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
      const response = await axios.post(`${API_BASE_URL}/api/reset-password`, { token, password });
      setMessage(response.data.message || 'Password reset successful!');
      // Redirect to sign-in page after successful password reset
      setTimeout(() => {
        navigate('/signin');
      }, 2000);
    } catch (error) {
      console.error('Reset password error:', error.response?.data);
      setMessage(error.response?.data.message || 'Error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      {message && <p className="mb-4 text-center">{message}</p>}
      
      {/* Render the form only if the token is valid */}
      {!message.includes('success') && !message.includes('Invalid') && (
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full p-2 border rounded"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <button
              type="submit"
              className={`w-full p-2 rounded bg-blue-600 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Reset Password'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
