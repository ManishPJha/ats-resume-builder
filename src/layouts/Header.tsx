import { Link } from 'react-router-dom';

import { useEffect, useState, useRef } from 'react';

import useAuth from '../hooks/useAuth';

const Header = () => {
  const { isAuthenticated, user, login, logout } = useAuth();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener when dropdown is open
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsDropdownOpen(false);
    };
  }, []);

  return (
    <header className="bg-blue-500 text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-bold hover:text-blue-200 transition duration-300"
        >
          ResumeCraft Pro
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/builder"
                className="hover:text-blue-200 transition duration-300"
              >
                Builder
              </Link>
            </li>
            <li>
              <Link
                to="/templates"
                className="hover:text-blue-200 transition duration-300"
              >
                Templates
              </Link>
            </li>
            <li>
              <Link
                to="/ats-tips"
                className="hover:text-blue-200 transition duration-300"
              >
                ATS Tips
              </Link>
            </li>
          </ul>
        </nav>

        {/* User Profile and Actions */}
        <div className="relative" ref={dropdownRef}>
          {isAuthenticated ? (
            <>
              {/* Profile Dropdown Toggle */}
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <img
                  src={user?.picture}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border-2 border-white"
                />
                <span className="text-sm font-medium">{user?.name}</span>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      <li>
                        <Link
                          to="/profile"
                          onClick={() => setIsDropdownOpen(false)}
                          className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-300"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-300"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </>
          ) : (
            <button
              onClick={() => login()}
              className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-100 transition duration-300"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
