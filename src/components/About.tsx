import React, { useRef, useEffect, useState } from 'react';
import AnimatedCounter from './AnimatedCounter';

const About: React.FC = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animationTriggered) {
            setIsVisible(true);
            setAnimationTriggered(true);
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animationTriggered]);
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>About BorangiLABS</h2>
            <p className="about-intro">
              <strong>BorangiLABS</strong> is the software and innovation arm of <strong>BORANGI</strong>, the parent company.
            </p>
            <p>
              As a cutting-edge technology company, we specialize in custom software solutions.
              Our team of experienced developers and designers work together to deliver high-quality,
              scalable, and maintainable applications that drive business growth.
            </p>
            <p>
              With expertise in web development, POS systems, SaaS solutions, and AI technologies,
              we help businesses of all sizes transform their ideas into reality through innovative
              technology solutions.
            </p>
            <div className={`stats ${isVisible ? 'visible' : ''}`} ref={statsRef}>
              <div className="stat-item">
                <div className="stat-number">
                  {isVisible && <AnimatedCounter value={50} duration={2000} />}
                </div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  {isVisible && <AnimatedCounter value={45} duration={2000} />}
                </div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number" style={{ fontSize: '2.5rem', lineHeight: '1.2' }}>
                  {isVisible && 'Proven'}
                </div>
                <div className="stat-label">Track Record</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
