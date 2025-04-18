import React from 'react';
import './ServicesSection.css';

import smallImg from '../../assets/images/images.jpeg';
import largeImg from '../../assets/images/Ouvrir-agence-de-gestion-locative-1.jpg';



const ServicesSection: React.FC = () => (
    <section className="services-section">
      <h2>Optimisez la gestion de vos biens immobiliers avec nos services</h2>
      <div className="services-container">
        <div className="left-column">
          <p>
            Nous proposons une solution complète pour gérer vos biens immobiliers de manière simple et efficace. De l'attribution des logements à la gestion des documents et calendriers, notre plateforme vous aide à optimiser chaque aspect de la gestion locative. Vous pouvez facilement suivre vos propriétés, gérer les locataires, et rester à jour avec toutes les notifications et événements importants.
          </p>
          <img src={smallImg} className="service-img-small" alt="Gestion immobilière" />
        </div>
        <div className="right-column">
          <img src={largeImg} className="service-img-large" alt="Gestion locative" />
          <p>
            Notre plateforme intuitive vous permet de gérer vos biens en toute simplicité. Grâce à des outils puissants, vous pouvez facilement attribuer des logements, suivre les paiements, gérer les baux, et plus encore.
          </p>
          <button className="service-btn">Commencez à gérer vos biens dès maintenant</button>
        </div>
      </div>
    </section>
  );
  
  export default ServicesSection;
