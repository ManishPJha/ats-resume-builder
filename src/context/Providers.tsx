import React from 'react';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

import AuthContextProvider from './AuthProvider';

const options: Auth0ProviderOptions = {
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  authorizationParams: {
    redirect_uri: import.meta.env.PROD
      ? import.meta.env.VITE_AUTH0_REDIRECT_URL
      : 'http://localhost:5173/',
  },
};

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Auth0Provider {...options}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </Auth0Provider>
    </>
  );
};

export default Providers;
