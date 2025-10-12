import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { Service } from '../types/service';
import Contact from '../components/Contact';
import './ServiceDetail.css';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Force scroll to top immediately
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
    
    if (!slug) {
      setLoading(false);
      return;
    }

    // Load service data
    const foundService = getServiceBySlug(slug);
    setService(foundService || null);
    setLoading(false);
    
    // Add a small delay and force scroll again after content loads
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
      
      // Force a reflow to ensure the page is fully rendered
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 50);

    return () => clearTimeout(timer);
  }, [slug]);

  if (loading) {
    return (
      <div className="service-detail loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>Loading service details...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="page-content">
        <section className="not-found-page" style={{
          padding: '100px 0',
          textAlign: 'center',
          backgroundColor: '#0a192f',
          color: '#e6f1ff',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div className="container">
            <div className="not-found-content">
              <h1 style={{
                fontSize: '3.5rem',
                marginBottom: '1.5rem',
                color: '#64ffda',
                fontWeight: 700
              }}>404: Service Not Found</h1>
              
              <p className="lead" style={{
                fontSize: '1.25rem',
                maxWidth: '600px',
                margin: '0 auto 2rem',
                lineHeight: 1.6
              }}>
                The service you're looking for doesn't exist or has been moved.
              </p>
              
              <div className="cta-section" style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: '2rem'
              }}>
                <button 
                  onClick={() => navigate('/')} 
                  className="btn btn-primary"
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#64ffda',
                    color: '#0a192f',
                    border: '1px solid #64ffda',
                    fontWeight: 600
                  }}
                >
                  Back to Home
                </button>
                <button 
                  onClick={() => navigate('/#services')} 
                  className="btn btn-outline"
                  style={{
                    padding: '0.75rem 2rem',
                    fontSize: '1rem',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'transparent',
                    color: '#64ffda',
                    border: '1px solid #64ffda',
                    fontWeight: 600
                  }}
                >
                  View Our Services
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Reuse the Contact section from the homepage */}
        <Contact />
      </div>
    );
  }

  // Simplified tech stack renderer without icons
  const renderTechStack = (stack: any) => {
    const renderTechCategory = (title: string, items: string[] | undefined, key: string) => {
      if (!items || items.length === 0) return null;
      
      return (
        <div className="tech-category" key={key}>
          <h4>{title}</h4>
          <div className="tech-tags">
            {items.map((tech, i) => (
              <span key={`${key}-${i}`} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="tech-stack">
        <h3>Our Technology & Tools</h3>
        <div className="tech-stack-grid">
          {stack.frontend && renderTechCategory('Frontend', stack.frontend, 'frontend')}
          {stack.backend && renderTechCategory('Backend', stack.backend, 'backend')}
          {stack.databases && renderTechCategory('Databases', stack.databases, 'db')}
          {stack.cms && renderTechCategory('CMS', stack.cms, 'cms')}
          {stack.ecommerce && renderTechCategory('E-commerce', stack.ecommerce, 'ecom')}
          {stack.devops && renderTechCategory('DevOps & Cloud', stack.devops, 'devops')}
          {stack.diagnostic && renderTechCategory('Diagnostic Tools', stack.diagnostic, 'diagnostic')}
          {stack.repair && renderTechCategory('Repair Equipment', stack.repair, 'repair')}
          {stack.software && renderTechCategory('Software', stack.software, 'software')}
          {stack.certifications && renderTechCategory('Certifications', stack.certifications, 'certs')}
        </div>
      </div>
    );
  };

  return (
    <div className="service-detail-page">
      <div className="service-header">
        <div className="container">
          {service.icon && (
            <div className="service-icon">
              <span className="emoji-icon">{service.icon}</span>
            </div>
          )}
          <h1 className="service-title">{service.title}</h1>
          <p className="service-price">{service.price}</p>
          <p className="service-subtitle">{service.description}</p>
        </div>
      </div>
      
      <div className="service-content">
        <section className="service-section">
          <h2 className="section-title">What's Included</h2>
          <ul className="features-grid">
            {service.features.map((feature, index) => (
              <li key={index} className="feature-item">
                <span className="feature-check">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>
        
        {service.websiteTypes && service.websiteTypes.length > 0 && (
          <section className="service-section">
            <h2 className="section-title">Types of {service.title}</h2>
            <div className="benefits-grid">
              {service.websiteTypes.map((type, index) => (
                <div key={index} className="benefit-card">
                  <h3>{type.name}</h3>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {service.techStack && (
          <section className="service-section">
            {renderTechStack(service.techStack)}
          </section>
        )}
        
        {service.process && service.process.length > 0 && (
          <section className="service-section">
            <h2 className="section-title">Our {service.title} Process</h2>
            <div className="process-steps">
              {service.process.map((step, index) => (
                <div key={index} className="process-step">
                  <div className="step-content">
                    <h3>Step {index + 1}</h3>
                    <p>{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
        
        {service.benefits && service.benefits.length > 0 && (
          <section className="service-section">
            <h2 className="section-title">Why Choose Us</h2>
            <div className="benefits-grid">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="benefit-card">
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
          </section>
        )}
        
        <section className="service-section">
          <div className="cta-section">
            <button 
              onClick={() => navigate('/contact')} 
              className="btn btn-primary"
            >
              <i className="fas fa-paper-plane"></i> Get a Free Quote
            </button>
            <button 
              onClick={() => window.history.back()} 
              className="btn btn-outline"
            >
              <i className="fas fa-arrow-left"></i> Back to Services
            </button>
          </div>
        </section>
        
        <Contact />
      </div>
      
      <div className="service-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
};

export default ServiceDetail;
