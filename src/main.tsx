import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './pages/Calendar'

const rootElement = document.getElementById('root');

if (rootElement) {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Erreur lors du rendu de l\'application:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; text-align: center;">
        <h1>Erreur lors du chargement du calendrier</h1>
        <p>Une erreur s'est produite lors du chargement de l'application. Veuillez vérifier la console pour plus de détails.</p>
      </div>
    `;
  }
} else {
  console.error('Élément racine non trouvé');
}
