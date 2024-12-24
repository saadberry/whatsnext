/*
This wil be our Signup page
*/
'use client';
import { useState } from 'react';
import { 
  ERROR, SUCCESS, BASE_URL, POST, ERROR_MSG,
  MIN_PASSWORD_LEN, SPECIAL_CHARACTERS, SPECIAL_CHARACTERS_REQUIRED,
  SIGNUP_SUCCESSFUL, SWITCH_WINDOW_DELAY, REFRESH_NOTIFICATION_DELAY
} from '../../utils/constants';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  // Hooks for notifications
  const [notification, setNotification] = useState({ message: "", type: "" });

  const showNotification = (message, type = SUCCESS) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), REFRESH_NOTIFICATION_DELAY);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validating email
     // Validate email ends with .com
    if (!email.endsWith('.com')) {
      setError("Please enter a proper email");
      return;
    }

    // Basic password validation
    // Validating length
    if (password.length < 8) {
      setError(MIN_PASSWORD_LEN);
      return;
    }
    // Validating special characters
    if (SPECIAL_CHARACTERS.every(char => !password.includes(char))) {
      setError(SPECIAL_CHARACTERS_REQUIRED);
      return;

    }
    setError('');

    // Form data
    const formData = {
      name,
      email,
      password
    };

    try {
      setLoading(true);
      // Send POST request to the server
      const response = await fetch(`${BASE_URL}/users/signup`, {
        method: POST,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle response
      if (response.ok) {
        showNotification(SIGNUP_SUCCESSFUL, SUCCESS)
        setName('');
        setEmail('');
        setPassword('');
        // Redirect to login page
        setTimeout(() => {
            window.location.href = '/login'; 
          }, SWITCH_WINDOW_DELAY); // 3000 milliseconds (3 seconds) delay      
          } else {
        const data = await response.json();
        showNotification(ERROR_MSG, ERROR)
      }
    } catch (err) {
      showNotification(ERROR_MSG, ERROR)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="p-6 rounded-lg shadow-lg w-full max-w-md">
      {/* Render notification */}
        {
          notification.message && (
          <div
            className={`fixed bottom-7 left-4 px-4 py-2 rounded-lg ${
              notification.type === "success" ? "bg-green-600" : "bg-red-600"
            } text-white`}
          >
            {notification.message}
          </div>
        )
    }
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-900 text-white">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-white">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={loading}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        {/* Success Message */}
        {success && (
          <p className="mt-4 text-center text-sm text-green-600">{success}</p>
        )}

        {/* Link to Login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
