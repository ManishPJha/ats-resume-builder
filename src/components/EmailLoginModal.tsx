import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { EmailLoginModalProps } from './types';

const EmailLoginModal: React.FC<EmailLoginModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { loginWithRedirect } = useAuth0();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    loginWithRedirect({
      authorizationParams: {
        login_hint: email, // Pre-fill the email field in Auth0's login page
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
      {/* Modal Container */}
      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg shadow-2xl w-96 max-w-full mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Content */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome Back
        </h1>
        {error && (
          <p className="text-red-500 mb-4 text-center text-sm">{error}</p>
        )}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
            placeholder="Enter your email"
            required
          />
        </div>
        <button
          onClick={handleContinue}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default EmailLoginModal;
