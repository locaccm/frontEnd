import React from 'react';

interface FeatureProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="feature-card">
    <img src={icon} alt={title} className="feature-icon" />
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

export default FeatureCard;
