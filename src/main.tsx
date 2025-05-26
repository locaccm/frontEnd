import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles/styles.css'
import App from './pages/wealthManagement/wealthManagement.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
