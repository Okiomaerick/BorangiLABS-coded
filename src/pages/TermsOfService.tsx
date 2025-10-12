import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TermsOfService.css';

const TermsOfService: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = 'auto';
  }, []);

  return (
    <div className="terms-page">
      <div className="terms-container">
        <div className="terms-header">
          <div className="container">
            <h1 className="terms-title">Terms and Conditions</h1>
            <p className="terms-subtitle">Last Updated: September 28, 2025</p>
          </div>
        </div>
        
        <div className="container">
          <div className="terms-content">
          
          <section className="terms-section">
            <h2 className="section-title">1. Acceptance of Terms</h2>
            <div className="section-content">
              <p>
                Welcome to BorangiLABS. By accessing or using our services, you agree to be bound by these Terms and Conditions 
                and our Privacy Policy. If you do not agree with any part of these terms, you may not access our services.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <h2 className="section-title">2. Our Services</h2>
            <div className="section-content">
              <p>BorangiLABS offers comprehensive technology solutions including:</p>
              <ul className="service-list">
                <li><i className="fas fa-code"></i> Custom web and software development</li>
                <li><i className="fas fa-paint-brush"></i> UI/UX design and consulting</li>
                <li><i className="fas fa-server"></i> Website maintenance and technical support</li>
                <li><i className="fas fa-chart-line"></i> Technology strategy and consulting</li>
                <li><i className="fas fa-mobile-alt"></i> Mobile application development</li>
              </ul>
              <p className="note">
                <i className="fas fa-info-circle"></i> Specific service details and terms will be outlined in individual service agreements.
              </p>
            </div>
          </section>

          <section className="terms-section">
            <h2 className="section-title">3. Your Responsibilities</h2>
            <div className="section-content">
              <p>When using our services, you must:</p>
              <div className="responsibilities-grid">
                <div className="responsibility-card">
                  <i className="fas fa-user-shield"></i>
                  <h3>Account Security</h3>
                  <p>Maintain the confidentiality of your login credentials and account information.</p>
                </div>
                <div className="responsibility-card">
                  <i className="fas fa-balance-scale"></i>
                  <h3>Legal Compliance</h3>
                  <p>Use our services in compliance with all applicable laws and regulations.</p>
                </div>
                <div className="responsibility-card">
                  <i className="fas fa-exclamation-triangle"></i>
                  <h3>Prohibited Uses</h3>
                  <p>Do not engage in unauthorized access, data mining, or any activity that could harm our services.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2 className="section-title">4. Intellectual Property Rights</h2>
            <div className="section-content">
              <div className="ip-section">
                <div className="ip-content">
                  <h3><i className="fas fa-copyright"></i> Ownership</h3>
                  <p>
                    All content, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, 
                    and software, is the exclusive property of BorangiLABS or its content providers and is protected by international 
                    copyright, trademark, and other intellectual property laws.
                  </p>
                </div>
                <div className="ip-content">
                  <h3><i className="fas fa-tools"></i> License</h3>
                  <p>
                    We grant you a limited, non-exclusive, non-transferable license to access and use our services for your personal 
                    or internal business purposes, subject to these terms.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2 className="section-title">5. Limitations and Liability</h2>
            <div className="section-content">
              <div className="disclaimer-box">
                <i className="fas fa-exclamation-circle"></i>
                <div>
                  <h3>Important Disclaimer</h3>
                  <p>
                    To the maximum extent permitted by law, BorangiLABS shall not be liable for any indirect, incidental, special, 
                    consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, 
                    or any loss of data, use, goodwill, or other intangible losses, resulting from:
                  </p>
                  <ul className="liability-list">
                    <li><i className="fas fa-times"></i> Your access to, use of, or inability to access or use our services</li>
                    <li><i className="fas fa-times"></i> Any conduct or content of any third party on our services</li>
                    <li><i className="fas fa-times"></i> Unauthorized access, use, or alteration of your transmissions or data</li>
                    <li><i className="fas fa-times"></i> Any bugs, viruses, or the like that may be transmitted through our services</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2 className="section-title">6. Modifications to Terms</h2>
            <div className="section-content">
              <div className="update-notice">
                <i className="fas fa-sync-alt"></i>
                <div>
                  <h3>Policy Updates</h3>
                  <p>
                    We may update these Terms from time to time. When we do, we'll post the updated terms here and update the 
                    "Last Updated" date at the top of this page. Your continued use of our services after such changes constitutes 
                    your acceptance of the new terms.
                  </p>
                  <p className="highlight">
                    <i className="fas fa-bell"></i> We encourage you to review these Terms periodically for any changes.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2 className="section-title">7. Governing Law & Jurisdiction</h2>
            <div className="section-content">
              <div className="legal-info">
                <i className="fas fa-balance-scale-left"></i>
                <div>
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of Kenya, without regard to its 
                    conflict of law provisions. Any legal action or proceeding arising under these Terms will be brought 
                    exclusively in the courts located in Nakuru, Kenya.
                  </p>
                  <p>
                    Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="terms-section contact-section">
            <h2 className="section-title">8. Contact Us</h2>
            <div className="section-content">
              <div className="contact-cards">
                <div className="contact-card">
                  <i className="fas fa-envelope"></i>
                  <h3>Email</h3>
                  <a href="mailto:legal@borangilabs.com">legal@borangilabs.com</a>
                </div>
                <div className="contact-card">
                  <i className="fas fa-phone"></i>
                  <h3>Phone</h3>
                  <a href="tel:+254769702224">+254 769 702 224</a>
                </div>
                <div className="contact-card">
                  <i className="fas fa-map-marker-alt"></i>
                  <h3>Location</h3>
                  <p>Nakuru, Nakuru West, Kenya</p>
                </div>
              </div>
              <p className="response-time">
                <i className="fas fa-clock"></i> We typically respond to all inquiries within 24-48 business hours.
              </p>
            </div>
          </section>

          <div className="terms-footer">
            <p>Thank you for choosing BorangiLABS. We appreciate your business!</p>
            <Link to="/" className="btn btn-primary">
              <i className="fas fa-arrow-left"></i> Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="terms-wave">
      <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
      </svg>
    </div>
  </div>
  );
};

export default TermsOfService;
