import React from 'react';
import './Testimonials.css';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Susan Barongo',
      role: 'Host',
      company: 'Jake Podcast Show',
      content: 'BorangiLABS transformed our digital presence with their innovative web solutions. Their team delivered beyond our expectations with exceptional attention to detail and technical expertise.',
      avatar: '🎙️'
    },
    {
      id: 2,
      name: 'Nyakundi Obara',
      role: 'Founder',
      company: 'Moonlight Studios',
      content: 'Working with BorangiLABS was a game-changer for our startup. Their technical solutions are top-notch and they delivered our project ahead of schedule.',
      avatar: '🎬'
    },
    {
      id: 3,
      name: 'Sarah Wanjiku',
      role: 'Marketing Director',
      company: 'Venti Advocates',
      content: 'The team at BorangiLABS understood our vision perfectly. Their creative approach and technical skills helped us achieve our business goals effectively.',
      avatar: '⚖️'
    },
    {
      id: 4,
      name: 'Margaret Buyaki',
      role: 'Operations Manager',
      company: 'REER Medical Supplies',
      content: 'Exceptional service and support throughout our project. BorangiLABS is our go-to partner for all technical solutions.',
      avatar: '🏥'
    },
    {
      id: 5,
      name: 'James Mwangi',
      role: 'Lead Investigator',
      company: 'Mwanga Detectives',
      content: 'The website BorangiLABS created for our private investigation firm has been a game-changer. It\'s professional, secure, and helps us connect with clients who need our services. The booking system integration works flawlessly.',
      avatar: '🕵️'
    },
    {
      id: 6,
      name: 'Joyce Kwamboka',
      role: 'Owner',
      company: 'Hygienic One Dairy',
      content: 'The POS system designed by BorangiLABS has streamlined our operations significantly. Inventory management is now a breeze, and the sales reporting features have given us valuable business insights. Highly recommended!',
      avatar: '🛒'
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Hear from businesses that have transformed with our solutions</p>
        
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.content}"</p>
              </div>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {testimonial.avatar}
                </div>
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-title">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
