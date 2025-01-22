import { useEffect, useState } from 'react';
import {
  AppState,
  RedirectLoginOptions,
  useAuth0,
  User,
} from '@auth0/auth0-react';

import { authContext } from '../hooks/useAuth';

import FullPageLoader from '../components/FullPageLoader';

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    isAuthenticated,
    isLoading,
    error,
    user: authenticatedUser,
    loginWithRedirect,
    logout: logoutWithRedirect,
  } = useAuth0();

  const [user, setUser] = useState<User | null>(null);

  const login = async (loginOptions?: RedirectLoginOptions<AppState>) =>
    await loginWithRedirect(loginOptions);

  const logout = async () =>
    await logoutWithRedirect({
      logoutParams: {
        returnTo: window.location.origin, // Redirect to the home page after logout
      },
    });

  useEffect(() => {
    if (isAuthenticated && authenticatedUser && !isLoading && !error) {
      setUser(authenticatedUser);
    }
  }, [isAuthenticated, error, isLoading, authenticatedUser]);

  useEffect(() => {
    // clean up
    return () => {
      setUser(null);
    };
  }, []);

  if (isLoading) return <FullPageLoader />;

  return (
    <authContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;
