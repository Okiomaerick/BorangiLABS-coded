import React, { useEffect, useState, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

// Navigation item type
type NavItem = {
  id?: string;
  path?: string;
  label: string;
};

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  
  // Check if viewport is mobile
  const isMobileView = window.innerWidth < 992; // Match your mobile breakpoint
  
  // Memoize the scroll handler
  const handleScroll = useCallback(() => {
    // Ignore scroll changes on mobile
    if (isMobileView) return;
    
    const scrolled = window.scrollY > 50;
    if (scrolled !== isScrolled) {
      setIsScrolled(scrolled);
    }
  }, [isScrolled, isMobileView]);

  // Handle scroll effect
  useEffect(() => {
    // On mobile, always show the header in its scrolled state
    if (isMobileView) {
      setIsScrolled(true);
      return;
    }
    
    // Only add scroll listener on homepage for desktop
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true); // Always show top nav on other pages
    }

    // Initial check for desktop
    if (!isMobileView) {
      handleScroll();
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomePage, isScrolled, handleScroll, isMobileView]);
  
  // Skip to main content handler
  const handleSkipToContent = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.setAttribute('tabindex', '-1');
      (mainContent as HTMLElement).focus();
    }
  };



  // Scroll to section on homepage
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

  const headerClass = `header ${isHomePage ? 'home-header' : ''} ${isScrolled ? 'scrolled' : 'initial'}`;
  // Navigation items data
  const navItems: NavItem[] = [
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { path: '/knowledge-base', label: 'Knowledge Base' },
    { path: '/blog', label: 'Blog' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' }
  ];



  return (
    <header className={headerClass}>
      {/* Skip to main content for keyboard users */}
      <a href="#main-content" className="skip-link" onClick={handleSkipToContent}>
        Skip to main content
      </a>
      
      <div className="container">
        <Link 
          to="/" 
          className="logo"
          onClick={() => {
            window.scrollTo(0, 0);
          }}
          aria-label="BorangiLABS Home"
        >
          BorangiLABS
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <ul className="nav-list" role="menubar">
            {navItems.map((item) => (
              <li key={item.id || item.path} className="nav-item" role="none">
                {item.path ? (
                  <Link 
                    to={item.path}
                    className={location.pathname.startsWith(item.path) ? 'active' : ''}
                    onClick={() => {
                      window.scrollTo(0, 0);
                    }}
                    role="menuitem"
                    aria-current={location.pathname.startsWith(item.path) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id!);
                    }}
                    className={location.hash === `#${item.id}` ? 'active' : ''}
                    role="menuitem"
                    aria-current={location.hash === `#${item.id}` ? 'true' : undefined}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
