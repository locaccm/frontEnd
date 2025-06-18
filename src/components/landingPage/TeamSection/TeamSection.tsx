import React from 'react';
import TeamMemberCard from './TeamMemberCard.js';
import '../../../styles/landingPage/TeamSection.css';

// Images importées directement
import imgMatthieu from '../../../assets/images/landingPage/imgMatthieu.jpeg';
import imgTom from '../../../assets/images/landingPage/imgTom.jpeg';
import imgAxel from '../../../assets/images/landingPage/dog.png';
import imgMosleh from '../../../assets/images/landingPage/imgMosleh.png';
import imgClement from '../../../assets/images/landingPage/dog.png';
import imgLeo from '../../../assets/images/landingPage/imgLeo.png';
import imgDylan from '../../../assets/images/landingPage/dog.png';
import imgMaxime from '../../../assets/images/landingPage/imgMaxime.jpeg';
import imgDynastie from '../../../assets/images/landingPage/dog.png';

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