import React from 'react';
import FeatureCard from './FeatureCard';
import './Features.css';

import icon1 from '../../assets/1312661-81a73415.png';
import icon2 from '../../assets/1670355-c14690e6.png';
import icon3 from '../../assets/4844346-31306952.png';
import icon4 from '../../assets/1182820-c9c09289.png';

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
