import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PrivacyPolicy.css';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <div className="privacy-page">
      <div className="privacy-container">
        <div className="privacy-header">
          <div className="container">
            <h1 className="privacy-title">Privacy Policy</h1>
            <p className="privacy-subtitle">Last Updated: September 24, 2025</p>
          </div>
        </div>
        
        <div className="container">
          <div className="privacy-content">
            <section className="privacy-section">
              <h2 className="section-title">1. Introduction</h2>
              <div className="section-content">
                <p>
                  Welcome to BorangiLABS. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our 
                  website and tell you about your privacy rights and how the law protects you.
                </p>
              </div>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">2. Information We Collect</h2>
              <div className="section-content">
                <p>We may collect, use, store, and transfer different kinds of personal data about you, including:</p>
                <ul className="privacy-list">
                  <li><i className="fas fa-user"></i> Identity Data (name, username, or similar identifier)</li>
                  <li><i className="fas fa-envelope"></i> Contact Data (email address, phone number)</li>
                  <li><i className="fas fa-laptop-code"></i> Technical Data (IP address, browser type, location, etc.)</li>
                  <li><i className="fas fa-chart-line"></i> Usage Data (how you use our website, products, and services)</li>
                  <li><i className="fas fa-bullhorn"></i> Marketing and Communications Data (your preferences in receiving marketing)</li>
                </ul>
              </div>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">3. How We Use Your Data</h2>
              <div className="section-content">
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <div className="info-grid">
                  <div className="info-card">
                    <h3><i className="fas fa-server"></i> Service Provision</h3>
                    <p>To provide and maintain our service, notify you about changes, and allow participation in interactive features.</p>
                  </div>
                  <div className="info-card">
                    <h3><i className="fas fa-headset"></i> Support & Improvement</h3>
                    <p>To provide customer support and gather analysis to improve our service.</p>
                  </div>
                  <div className="info-card">
                    <h3><i className="fas fa-shield-alt"></i> Security</h3>
                    <p>To monitor usage and detect, prevent, and address technical issues.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">4. Data Security</h2>
              <div className="section-content">
                <p>
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
                  used, or accessed in an unauthorized way, altered, or disclosed.
                </p>
                <div className="update-notice">
                  <i className="fas fa-lock"></i>
                  <div>
                    <h3>Security Measures</h3>
                    <p>
                      We limit access to your personal data to employees, agents, contractors, and other third parties 
                      who have a business need to know. They will only process your personal data on our instructions 
                      and they are subject to a duty of confidentiality.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">5. Your Legal Rights</h2>
              <div className="section-content">
                <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data:</p>
                <div className="info-grid">
                  <div className="info-card">
                    <h3><i className="fas fa-search"></i> Access & Correction</h3>
                    <p>Request access to or correction of your personal data.</p>
                  </div>
                  <div className="info-card">
                    <h3><i className="fas fa-trash-alt"></i> Erasure</h3>
                    <p>Request erasure of your personal data.</p>
                  </div>
                  <div className="info-card">
                    <h3><i className="fas fa-ban"></i> Restriction</h3>
                    <p>Object to processing or request restriction of processing your data.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="privacy-section">
              <h2 className="section-title">6. Contact Us</h2>
              <div className="section-content">
                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                <div className="info-grid">
                  <div className="info-card">
                    <h3><i className="fas fa-envelope"></i> Email</h3>
                    <a href="mailto:privacy@borangilabs.com">privacy@borangilabs.com</a>
                  </div>
                  <div className="info-card">
                    <h3><i className="fas fa-phone"></i> Phone</h3>
                    <a href="tel:+254769702224">+254 769 702 224</a>
                  </div>
                  <div className="info-card">
                    <h3><i className="fas fa-map-marker-alt"></i> Location</h3>
                    <p>Nakuru, Nakuru West, Kenya</p>
                  </div>
                </div>
                <p className="response-time">
                  <i className="fas fa-clock"></i> We typically respond to all inquiries within 24-48 business hours.
                </p>
              </div>
            </section>

            <div className="privacy-footer">
              <p>Thank you for trusting BorangiLABS with your information. We're committed to protecting your privacy.</p>
              <Link to="/" className="btn">
                <i className="fas fa-arrow-left"></i> Return to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="privacy-wave">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
