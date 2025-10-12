import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './Components.css';

// Wrapper component for the arrow icon
const ArrowIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <FaArrowUp className={className} />
);

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="tech-scroll-container">
      <button
        className={`tech-scroll-button ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        data-testid="scroll-to-top"
      >
        <div className="tech-scroll-icon">
          <ArrowIcon className="scroll-arrow" />
          <div className="tech-scroll-pulse"></div>
          <div className="tech-scroll-orbits">
            <div className="orbit orbit-1"></div>
            <div className="orbit orbit-2"></div>
            <div className="orbit orbit-3"></div>
          </div>
          <div className="tech-scroll-core"></div>
        </div>
        <span className="tech-scroll-tooltip">Back to Top</span>
      </button>
    </div>
  );
};

export default ScrollToTopButton;
