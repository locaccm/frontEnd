import React from 'react';
import './CallToAction.css';

const CallToAction: React.FC = () => (
<section className="optimisation-section">
    <div className="optimisation-content">
      <div className="text-content">
        <h2>Optimisez la gestion de vos biens immobiliers</h2>
        <p>
          Nos solutions innovantes et simples à utiliser sont conçues pour vous aider à maximiser la rentabilité et la gestion de vos biens immobiliers. Rejoignez notre plateforme et gérez vos propriétés en toute tranquillité.
        </p>
      </div>
      <div className="action-box">
        <h3>Commencez dès maintenant</h3>
        <button className="cta-btn">Créez votre compte</button>
      </div>
    </div>
  </section>
);

export default CallToAction;
