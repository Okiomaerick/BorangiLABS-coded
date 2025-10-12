import React from 'react';

// Import team member images
import erickImage from '../assets/team/erick-okioma.webp';
import humphreyImage from '../assets/team/humphrey-nyakundi.webp';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  expertise: string[];
  image: string;

}

const Team: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Erick Okioma',
      role: 'Founder & Lead Engineer',
      expertise: [
        'Full-Stack Development',
        'Cloud Architecture',
        'Technical Leadership',
        'Network Solutions',
        'System Design'
      ],
      image: erickImage,

    },
    {
      id: 2,
      name: 'Humphrey Nyakundi',
      role: 'Head of Strategy & Operations',
      expertise: [
        'Business Strategy',
        'Operations Management',
        'Customer Success',
        'Backend Development',
        'System Architecture'
      ],
      image: humphreyImage,

    }
  ];

  return (
    <section id="team" className="team">
      <div className="container">
        <div className="section-header">
          <h2>Our Team</h2>
          <p className="section-subtitle">Meet the brilliant minds behind BorangiLABS</p>
        </div>
        
        <div className="team-grid">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-card-inner">
                <div className="team-image-container">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={`team-image ${member.name.toLowerCase().includes('humphrey') ? 'humphrey-image' : ''}`} 
                  />
                </div>
                <div className="team-content">
                  <h3>{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                  <div className="team-expertise">
                    {member.expertise.map((skill, index) => (
                      <span key={index} className="expertise-tag">{skill}</span>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
