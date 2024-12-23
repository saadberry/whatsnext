/*
This will be our Login page
*/
'use client';

import { useState } from 'react';
import { 
  ERROR, SUCCESS, BASE_URL, POST, ERROR_MSG
} from '../../utils/constants';

export default function LoginPage() {
  // Hooks for user email
  const [email, setEmail] = useState('');
  // Hooks for user password
  const [password, setPassword] = useState('');
  // Hooks for error
  const [error, setError] = useState('');
  // Hooks for loading state
  const [loading, setLoading] = useState(false);
  // Hooks for notifications
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type = SUCCESS) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      // Send POST request to the server
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // Handle response error
        showNotification(ERROR_MSG, ERROR);
        return;
      }

      // Get JWT token from server response
      const data = await response.json();
      const jwtToken = data.token;
      // Saving token in localStorage
      localStorage.setItem('jwtToken', jwtToken);
      // Redirect user to /dashboard on successful login
      window.location.href = '/dashboard'; 
    } catch (err) {
      showNotification(ERROR_MSG, ERROR);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-black-100 p-6 rounded-lg shadow-lg w-full max-w-md">
      {notification.message && (
  <div
    className={`fixed bottom-7 left-4 px-4 py-2 rounded-lg ${
      notification.type === "success" ? "bg-green-600" : "bg-red-600"
    } text-white`}
  >
    {notification.message}
  </div>
)}
        <h1 className="text-2xl font-bold text-center mb-4 text-white">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
