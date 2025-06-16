import React from 'react';
import FeatureCard from './FeatureCard.js';
import '../../../styles/landingPage/Features.css';

import icon1 from '../../../assets/images/landingPage/houses.png';
import icon2 from '../../../assets/images/landingPage/list.png';
import icon3 from '../../../assets/images/landingPage/graph.png';
import icon4 from '../../../assets/images/landingPage/notif.png';

const featuresData = [
  {
    icon: icon1,
    title: 'Gestion des biens',
    description: 'Organisez et suivez vos biens immobiliers en toute simplicité.',
  },
  {
    icon: icon2,
    title: 'Dashboard',
    description: 'Vue d’ensemble de vos propriétés et locataires.',
  },
  {
    icon: icon3,
    title: 'Calendriers',
    description: 'Planifiez et gérez vos locations facilement.',
  },
  {
    icon: icon4,
    title: 'Notifications',
    description: 'Recevez des alertes instantanées.',
  },
];

const Features: React.FC = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        {featuresData.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default Features;
