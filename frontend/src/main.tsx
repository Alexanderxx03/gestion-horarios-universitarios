import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const container = document.getElementById('root');
if (!container) throw new Error('#root no encontrado en el DOM');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
