import React, { useEffect } from 'react';
import Contact from '../components/Contact';

const ContactPage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-content">
      <Contact />
    </main>
  );
};

export default ContactPage;
