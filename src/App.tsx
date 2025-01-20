import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import Home from './pages/Home';
import Builder from './pages/Builder';
import Templates from './pages/Templates';
import Login from './pages/Login';
import Profile from './pages/Profile';
import NotFoundPage from './pages/NotFound';

import RouteWithoutLayout from './layouts/RouteWithoutLayout';
import RouteWithLayout from './layouts/RouteWithLayout';

import FullPageLoader from './components/FullPageLoader';

function App() {
  const { isLoading } = useAuth0();

  // Prevent right-click and inspect element globally
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        // (e.ctrlKey && e.shiftKey && e.key === 'C') ||
        (e.ctrlKey && e.key === 'U')
      ) {
        e.preventDefault();
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (isLoading) return <FullPageLoader />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RouteWithLayout element={<Home />} />} />
        <Route
          path="/builder"
          element={<RouteWithLayout element={<Builder />} />}
        />
        <Route
          path="/templates"
          element={<RouteWithLayout element={<Templates />} />}
        />
        <Route
          path="/Profile"
          element={<RouteWithLayout element={<Profile />} />}
        />
        <Route
          path="/login"
          element={<RouteWithoutLayout element={<Login />} />}
        />
        <Route
          path="*"
          element={<RouteWithoutLayout element={<NotFoundPage />} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
