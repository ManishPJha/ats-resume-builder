import { createContext, useEffect, useState } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';

const defaultValues = {
  user: null,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

interface ContextTypes {
  user: User | null;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const authContext = createContext<ContextTypes>(defaultValues);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    isAuthenticated,
    isLoading,
    error,
    user: authenticatedUser,
    loginWithRedirect,
    logout,
  } = useAuth0();

  const [user, setUser] = useState<User | null>(defaultValues.user);

  const login = async () => await loginWithRedirect();

  useEffect(() => {
    if (isAuthenticated && authenticatedUser && !isLoading && !error) {
      setUser(authenticatedUser);
    }
  }, [isAuthenticated, error, isLoading, authenticatedUser]);

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
