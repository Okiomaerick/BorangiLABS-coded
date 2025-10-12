import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './MobileNav.css';

const MobileNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/', label: 'Home', exact: true },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { path: '/knowledge-base', label: 'Knowledge Base' },
    { path: '/blog', label: 'Blog' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' }
  ];

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${sectionId}`);
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-button"
        onClick={toggleMenu}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        {isOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="mobile-menu-overlay" 
          onClick={toggleMenu}
          role="presentation"
        />
      )}

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-menu-overlay ${isOpen ? 'open' : ''}`} 
        onClick={toggleMenu}
        role="presentation"
      />

      {/* Mobile Menu */}
      <div 
        id="mobile-navigation" 
        className={`mobile-nav ${isOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
      >
        {/* Close Button */}
        <button 
          className="mobile-close-button"
          onClick={toggleMenu}
          aria-label="Close menu"
        >
          ✕
        </button>
        <ul className="mobile-nav-list">
          {navItems.map((item) => (
            <li key={item.id || item.path} className="mobile-nav-item">
              {item.path ? (
                <Link 
                  to={item.path}
                  className={item.exact 
                    ? (location.pathname === item.path ? 'active' : '')
                    : (location.pathname.startsWith(item.path) && item.path !== '/' ? 'active' : '')
                  }
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: 'block',
                    padding: '12px 20px',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '18px',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => {
                    scrollToSection(item.id!);
                    setIsOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    fontSize: '18px',
                    padding: '12px 20px',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(255,255,255,0.1)'
                  }}
                >
                  {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileNav;
