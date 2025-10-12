import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { services } from '../data/services';
import './Services.css';

// Import service images
import hardwareRepairBg from '../assets/services/hardware-repair-bg.webp';
import webDevBg from '../assets/services/web-dev-bg.webp';
import posSystemsBg from '../assets/services/pos-systems-bg.webp';
import saasBg from '../assets/services/saas-bg.webp';
import aiAutomationBg from '../assets/services/ai-automation-bg.webp';

// Service background configurations
const serviceBackgrounds: { [key: string]: { image: string; color: string } } = {
  'hardware-repair': { 
    image: hardwareRepairBg, 
    color: 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)' 
  },
  'web-development': { 
    image: webDevBg, 
    color: 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)' 
  },
  'pos-systems': { 
    image: posSystemsBg, 
    color: 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)' 
  },
  'saas-solutions': { 
    image: saasBg, 
    color: 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)' 
  },
  'ai-automation': { 
    image: aiAutomationBg, 
    color: 'linear-gradient(135deg, #1a2a3a 0%, #2c3e50 100%)' 
  },
};

const Services: React.FC = () => {
  const navigate = useNavigate();
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Handle smooth scrolling and card expansion
  useEffect(() => {
    if (!expandedCard || !containerRef.current) return;
    
    const container = containerRef.current;
    const card = cardsRef.current[expandedCard];
    if (!card) return;
    
    // Calculate the scroll position to center the expanded card
    const containerWidth = container.offsetWidth;
    const cardWidth = card.offsetWidth;
    const scrollPosition = card.offsetLeft - (containerWidth - cardWidth) / 2;
    
    // Smooth scroll to the card
    container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    // Force reflow for smooth animation
    card.getBoundingClientRect();
    
  }, [expandedCard]);

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    e.stopPropagation();
    // Only navigate if clicking the card itself, not its children
    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.service-card') === e.currentTarget) {
      navigate(`/services/${slug}`);
    }
  };

  const handleCardHover = (slug: string) => {
    // Only update if not already expanded to prevent unnecessary re-renders
    if (expandedCard !== slug) {
      setExpandedCard(slug);
    }
  };

  const handleCardLeave = () => {
    // Small delay to prevent flickering when moving between cards
    const leaveTimer = setTimeout(() => {
      // Don't collapse if user is interacting with the card
      const activeElement = document.activeElement;
      if (activeElement && activeElement.closest('.service-card')?.contains(activeElement)) {
        return;
      }
      setExpandedCard(null);
    }, 100);
    
    return () => clearTimeout(leaveTimer);
  };

  const handleContainerLeave = () => {
    // Small delay to prevent flickering when moving between cards
    const leaveTimer = setTimeout(() => {
      setExpandedCard(null);
    }, 150);
    
    return () => clearTimeout(leaveTimer);
  };

  return (
    <section id="services" className="services">
      <div className="container">
        <h2>Our Services</h2>
        <div 
          className="services-grid" 
          ref={containerRef}
          onMouseLeave={handleContainerLeave}
        >
          {services.map((service) => {
            const isExpanded = expandedCard === service.slug;
            return (
              <div 
                key={service.id}
                ref={el => cardsRef.current[service.slug] = el}
                className={`service-card ${isExpanded ? 'expanded' : ''}`}
                data-service={service.slug}
                style={{
                  background: serviceBackgrounds[service.slug]?.color,
                  backgroundImage: `url(${serviceBackgrounds[service.slug]?.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={(e) => handleCardClick(service.slug, e)}
                onMouseEnter={() => handleCardHover(service.slug)}
                onMouseLeave={handleCardLeave}
                onFocus={() => handleCardHover(service.slug)}
                onBlur={handleCardLeave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(service.slug, e as any);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View details about ${service.title}`}
                aria-expanded={isExpanded}
              >
                <div className="service-card-content">
                  <div className="service-icon" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="price" aria-label={`Price: ${service.price}`}>
                    {service.price}
                  </div>
                  <ul className="features" aria-label="Features">
                    {service.features.map((feature, i) => (
                      <li key={i}>
                        <span className="feature-bullet" aria-hidden="true">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className="btn-outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(service.slug, e);
                    }}
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
