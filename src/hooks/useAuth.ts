import { createContext, useContext } from 'react';

import type { AppState, RedirectLoginOptions, User } from '@auth0/auth0-react';

export interface ContextTypes {
  user: User | null;
  isAuthenticated: boolean;
  login: (options?: RedirectLoginOptions<AppState>) => Promise<void>;
  logout: () => Promise<void>;
}

const defaultValues = {
  user: null,
  isAuthenticated: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
};

export const authContext = createContext<ContextTypes>(defaultValues);
const useAuth = () => {
  const auth = useContext(authContext);

  if (!auth) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return auth;
};

export default useAuth;
