import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Self-hosted fonts (bundled by Vite — no external CDN request at runtime).
import '@fontsource-variable/bricolage-grotesque'
import '@fontsource-variable/inter'
import '@fontsource-variable/jetbrains-mono'

import './styles/global.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
