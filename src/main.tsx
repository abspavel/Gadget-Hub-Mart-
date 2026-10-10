import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Prevent unwanted mobile pinch-zoom gestures
if (typeof window !== 'undefined') {
  document.addEventListener('gesturestart', (e) => e.preventDefault());
  document.addEventListener('gesturechange', (e) => e.preventDefault());
  document.addEventListener('gestureend', (e) => e.preventDefault());
}

createRoot(getElementByIdOrThrow('root')).render(<App />);

function getElementByIdOrThrow(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Root element with id "${id}" not found`);
  return el;
}
