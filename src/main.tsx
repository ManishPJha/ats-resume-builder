import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Auth0Provider, Auth0ProviderOptions } from '@auth0/auth0-react';

import App from './App.tsx';

import './index.css';

const options: Auth0ProviderOptions = {
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  authorizationParams: {
    // audience: import.meta.env.VITE_AUTH0_AUDIENCE,
    redirect_uri: window.location.origin,
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider {...options}>
      <App />
    </Auth0Provider>
  </StrictMode>
);
