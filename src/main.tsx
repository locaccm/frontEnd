import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import DocumentManager from './pages/DocumentManager.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DocumentManager />
  </StrictMode>,
)
