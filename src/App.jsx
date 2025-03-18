import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import './app/styles/global.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div>App</div>
  </StrictMode>,
)