import React from 'react';
import TeamMemberCard from './TeamMemberCard';
import './TeamSection.css';

// Images importées directement
import imgMatthieu from '../../assets/1678628952885.jpeg';
import imgTom from '../../assets/1695633415246.jpeg';
import imgAxel from '../../assets/1695633415246.jpeg';
import imgMosleh from '../../assets/WhatsAppImage2022-05-14at16.54.10.jpeg';
import imgClement from '../../assets/1695633415246.jpeg';
import imgLeo from '../../assets/1695633415246.jpeg';
import imgDylan from '../../assets/1695633415246.jpeg';
import imgMaxime from '../../assets/1725356960518.jpeg';
import imgDynastie from '../../assets/1695633415246.jpeg';

const teamMembers = [
  { name: 'Matthieu', role: 'Architect cloud', image: imgMatthieu },
  { name: 'Tom DEHAME', role: 'Product Owner', image: imgTom },
  { name: 'Axel', role: 'Scrum Master', image: imgAxel },
  { name: 'Mosleh SNOUSSI', role: 'Front-End', image: imgMosleh },
  { name: 'Clement', role: 'DevOps', image: imgClement },
  { name: 'Leo', role: 'Testeur et Assurance qualité', image: imgLeo },
  { name: 'Dylan', role: 'Front-End', image: imgDylan },
  { name: 'Maxime', role: 'DevOps', image: imgMaxime },
  { name: 'Dynastie', role: 'Testeur et Assurance qualité', image: imgDynastie },
];

const TeamSection: React.FC = () => (
    <section className="team-section">
      <h1>Notre Équipe</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <TeamMemberCard
            key={index}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
  
  export default TeamSection;