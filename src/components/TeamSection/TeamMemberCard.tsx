import React from 'react';
import './TeamMemberCard.css';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, role, image }) => (
  <div className="team-member-card">
    <img src={image} alt={name} className="member-image" />
    <h3>{name}</h3>
    <p>{role}</p>
  </div>
);

export default TeamMemberCard;
