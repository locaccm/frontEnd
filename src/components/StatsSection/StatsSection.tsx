import React from 'react';
import './StatsSection.css';
import exampleImage from '../../assets/images/management-image.png';

const StatsSection: React.FC = () => (
    <section className="management-section">
    <div className="management-container">
      <div className="image-container">
        <img src={exampleImage} alt="Gestion immobilière" className="management-image" />
      </div>
      <div className="text-container">
        <h3>
          Une gestion intelligente et transparente pour maximiser la valeur de vos biens.
        </h3>
        <div className="stats-container">
          <div className="stat-item">
            <h4 className="stat-number">300+</h4>
            <p className="stat-text">propriétés gérées</p>
          </div>
          <div className="stat-item">
            <h4 className="stat-number">60+</h4>
            <p className="stat-text">locataires satisfaits</p>
          </div>
          <div className="stat-item">
            <h4 className="stat-number">5</h4>
            <p className="stat-text">ans d'expertise</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);
export default StatsSection;
