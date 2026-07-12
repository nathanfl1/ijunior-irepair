// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Importa o Tailwind globalmente
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)