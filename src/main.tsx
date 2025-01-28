import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';

import App from './App.tsx';

import Providers from './context/Providers.tsx';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <App />
      <SpeedInsights />
    </Providers>
  </StrictMode>
);
