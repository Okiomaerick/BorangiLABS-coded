import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import BorangiLogo from '../assets/images/borangi-logo.jpeg';
// Inline SVG Icons
const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
  </svg>
);

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [showResources, setShowResources] = useState(false);
  
  // Function to handle scrolling to top before navigation
  const handleNavigation = () => {
    window.scrollTo(0, 0);
    setShowResources(false);
  };
  
  // Close dropdown when clicking outside
  const handleClickOutside = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest('.footer-dropdown')) {
      setShowResources(false);
    }
  };
  
  // Add event listener for outside clicks
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside as any);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any);
    };
  }, []);
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo-container">
              <div className="footer-logo-hover">
                <div className="logo-image-wrapper">
                  <img 
                    src={BorangiLogo} 
                    alt="Borangi Logo" 
                    className="footer-logo"
                    width="180"
                    height="auto"
                  />
                  <div className="mission-overlay">
                    <p className="mission-statement">
                      Empowering businesses through innovative technology solutions that drive growth and efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <h3>BorangiLABS</h3>
            <p>Innovative technology solutions for your business needs. Let's build something amazing together.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={handleNavigation}>Home</Link></li>
              <li><HashLink to="/#services" onClick={handleNavigation}>Services</HashLink></li>
              <li><HashLink to="/#portfolio" onClick={handleNavigation}>Portfolio</HashLink></li>
              <li><HashLink to="/#about" onClick={handleNavigation}>About Us</HashLink></li>
              <li><HashLink to="/#contact" onClick={handleNavigation}>Contact</HashLink></li>
              <li><Link to="/blog" onClick={handleNavigation}>Blog</Link></li>
              <li><Link to="/knowledge-base" onClick={handleNavigation}>Knowledge Base</Link></li>
              <li><Link to="/careers" onClick={handleNavigation}>Careers</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Us</h4>
            <ul className="footer-contact">
              <li className="contact-item">
                <i className="icon-phone"></i>
                <a href="tel:+254769702224">+254 769 702 224</a>
              </li>
              <li className="contact-item">
                <i className="icon-email"></i>
                <a href="mailto:info@borangi.co.ke">info@borangi.co.ke</a>
              </li>
              <li className="contact-item">
                <i className="icon-location"></i>
                <span>Nakuru, Nakuru West, Kenya</span>
              </li>
              <li className="footer-social-links">
                <a href="https://instagram.com/borangi_technologies" target="_blank" rel="noopener noreferrer" className="social-icon instagram">
                  <InstagramIcon />
                </a>
                <a href="https://x.com/borangiuser" target="_blank" rel="noopener noreferrer" className="social-icon x">
                  <TwitterIcon />
                </a>
                <a href="https://github.com/borangi" target="_blank" rel="noopener noreferrer" className="social-icon github">
                  <GithubIcon />
                </a>
              </li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/services/web-development" onClick={handleNavigation}>Web Development</Link></li>
              <li><Link to="/services/pos-systems" onClick={handleNavigation}>POS Systems</Link></li>
              <li><Link to="/services/saas-solutions" onClick={handleNavigation}>SaaS Solutions</Link></li>
              <li><Link to="/services/ai-automation" onClick={handleNavigation}>AI & Automation</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <div className="footer-dropdown">
              <button 
                className="footer-dropdown-toggle" 
                onClick={() => setShowResources(!showResources)}
                aria-expanded={showResources}
                aria-controls="resources-dropdown"
              >
                Resources
                <span className={`dropdown-arrow ${showResources ? 'up' : 'down'}`}></span>
              </button>
              <ul 
                id="resources-dropdown" 
                className={`footer-dropdown-menu ${showResources ? 'show' : ''}`}
              >
                <li><Link to="/documents" onClick={handleNavigation}>Client Docs</Link></li>
                <li><Link to="/press" onClick={handleNavigation}>Press</Link></li>
                {/* Add more resources here as needed */}
              </ul>
            </div>
          </div>
          
          <div className="footer-section">
            <h4>Our Network</h4>
            <ul className="footer-links">
              <li><a href="https://isp.borangi.co.ke" target="_blank" rel="noopener noreferrer" onClick={handleNavigation}>BorangiISP</a></li>
              <li><a href="https://shop.borangi.co.ke" target="_blank" rel="noopener noreferrer" onClick={handleNavigation}>BorangiSHOP</a></li>
            </ul>
          </div>
          
          <div id="footer-newsletter" className="footer-section">
            <h4>Newsletter</h4>
            <p>Subscribe to our newsletter for the latest updates.</p>
            <form className="newsletter-form">
              <input type="email" placeholder="Your email address" required />
              <button type="submit" className="btn btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} BorangiLABS. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy-policy" onClick={handleNavigation}>Privacy Policy</Link>
            <span> | </span>
            <Link to="/terms-of-service" onClick={handleNavigation}>Terms of Service</Link>
            <span> | </span>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">Sitemap</a>
            <span> | </span>
            <a href="/robots.txt" target="_blank" rel="noopener noreferrer">Robots.txt</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
