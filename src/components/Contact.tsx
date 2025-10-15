import React, { useState, useEffect } from 'react';
import { useForm } from '@formspree/react';
import TerminalText from './TerminalText';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  timeline: string;
  budget: string;
  currency: string;
  subject: string;
  message: string;
  acceptedTerms: boolean;
  requestNDA: boolean;
}

const serviceTypes = [
  'Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'Hardware Repair',
  'IT Consulting',
  'Network Setup',
  'Other'
];

const timelines = [
  'Immediate (1-2 weeks)',
  'Soon (2-4 weeks)',
  'Flexible (1-3 months)',
  'Just exploring options'
];

const currencies = [
  { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
];

const getBudgetRanges = (currencyCode: string, currencySymbol: string) => {
  if (currencyCode === 'KES') {
    return [
      `${currencySymbol}10,000 - ${currencySymbol}50,000`,
      `${currencySymbol}50,000 - ${currencySymbol}200,000`,
      `${currencySymbol}200,000 - ${currencySymbol}500,000`,
      `${currencySymbol}500,000 - ${currencySymbol}1.5M`,
      `More than ${currencySymbol}1.5M`,
      'Need consultation'
    ];
  } else {
    return [
      `${currencySymbol}100 - ${currencySymbol}500`,
      `${currencySymbol}500 - ${currencySymbol}2,000`,
      `${currencySymbol}2,000 - ${currencySymbol}5,000`,
      `${currencySymbol}5,000 - ${currencySymbol}15,000`,
      `More than ${currencySymbol}15,000`,
      'Need consultation'
    ];
  }
};

const Contact: React.FC = () => {
  const [currency, setCurrency] = useState<string>('KES');
  const [budgets, setBudgets] = useState<string[]>(getBudgetRanges('KES', 'KSh'));
  const [state, handleSubmitFormspree] = useForm('mgvnodka');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceType: '',
    timeline: '',
    budget: '',
    currency: 'KES',
    subject: 'New Project Inquiry',
    message: '',
    acceptedTerms: true, // Pre-checked by default
    requestNDA: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'currency') {
      const selectedCurrency = currencies.find(c => c.code === value) || currencies[0];
      setCurrency(value);
      setBudgets(getBudgetRanges(value, selectedCurrency.symbol));
      
      // Reset budget when currency changes
      setFormData(prev => ({
        ...prev,
        currency: value,
        budget: ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Reset form when submission is successful
  useEffect(() => {
    if (state.succeeded) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: '',
        timeline: '',
        budget: '',
        currency: 'KES',
        subject: 'New Project Inquiry',
        message: '',
        acceptedTerms: true,
        requestNDA: false
      });
      setCurrency('KES');
      setBudgets(getBudgetRanges('KES', 'KSh'));
    }
  }, [state.succeeded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptedTerms) {
      alert('Please accept the terms and conditions to proceed.');
      return;
    }
    
    // Prepare form data for Formspree
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        formDataToSend.append(key, value ? 'Yes' : 'No');
      } else if (value) { // Only append if value is not empty
        formDataToSend.append(key, value as string);
      }
    });
    
    // Submit to Formspree
    await handleSubmitFormspree(formDataToSend);
  };

  return (
    <section id="contact" className="contact page-content">
      <div className="container">
        <h2>Get In Touch</h2>
        <div className="contact-container">
          <div className="contact-info">
            <TerminalText text="Contact Information" />
            <div className="info-item">
              <div>
                <h4>Location</h4>
                <p>Nakuru, Nakuru West<br />Kenya</p>
              </div>
            </div>
            <div className="info-item">
              <div>
                <h4>Email</h4>
                <p>info@borangi.co.ke</p>
              </div>
            </div>
            <div className="info-item">
              <div>
                <h4>Phone</h4>
                <p>+254 769 702 224</p>
              </div>
            </div>
            
            <div className="connect-section">
              <h3 className="connect-heading">Connect With Us</h3>
                <div className="social-links">
                <div className="social-link-wrapper">
                  <a 
                    href="https://www.instagram.com/borangilabs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link instagram"
                    aria-label="Instagram"
                  >
                    <span className="social-text">Instagram</span>
                  </a>
                </div>
                
                <div className="social-link-wrapper">
                  <a 
                    href="https://twitter.com/borangilabs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link twitter"
                    aria-label="Twitter"
                  >
                    <span className="social-text">Twitter</span>
                  </a>
                </div>
                
                <div className="social-link-wrapper">
                  <a 
                    href="https://github.com/borangilabs" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="social-link github"
                    aria-label="GitHub"
                  >
                    <span className="social-text">GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form" noValidate>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email *"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group half">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <input
                type="text"
                name="company"
                placeholder="Company Name"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group half">
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  required
                  className={!formData.serviceType ? 'placeholder-shown' : ''}
                >
                  <option value="">Select Service Type *</option>
                  {serviceTypes.map(service => (
                    <option key={service} value={service}>{service}</option>
                  ))}
                </select>
              </div>
              <div className="form-group half">
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  className={!formData.timeline ? 'placeholder-shown' : ''}
                >
                  <option value="">Project Timeline</option>
                  {timelines.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group two-thirds">
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={!formData.budget ? 'placeholder-shown' : ''}
                >
                  <option value="">Estimated Budget</option>
                  {budgets.map((budget, index) => (
                    <option key={index} value={budget}>{budget}</option>
                  ))}
                </select>
              </div>
              <div className="form-group one-third">
                <select
                  name="currency"
                  value={currency}
                  onChange={handleChange}
                  className="currency-selector"
                >
                  {currencies.map(currency => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            
            <div className="form-group terms-group">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark"></span>
                <span className="terms-text">
                  I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms and Conditions</a> and 
                  <a href="/privacy-policy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a>
                </span>
              </label>
              
              <label className="checkbox-container nda-checkbox">
                <input
                  type="checkbox"
                  name="requestNDA"
                  checked={formData.requestNDA}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark"></span>
                <span className="terms-text">
                  I would like to sign an NDA before sharing sensitive information
                </span>
              </label>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={state.submitting}
            >
              {state.submitting 
                ? 'Sending...' 
                : (formData.requestNDA ? 'Request NDA' : 'Send Message')
              }
            </button>
            
            {state.succeeded && (
              <div className="success-message" style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#4caf50',
                color: 'white',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                Thank you for your message! We'll get back to you soon.
              </div>
            )}
            
            {state.errors && (
              <div className="error-message" style={{
                marginTop: '20px',
                padding: '15px',
                backgroundColor: '#f44336',
                color: 'white',
                borderRadius: '4px',
                textAlign: 'center'
              }}>
                Oops! There was an error submitting the form. Please try again.
              </div>
            )}
          </form>
          
          <div className="supported-by" style={{ marginTop: '3rem', textAlign: 'center' }}>
            <p style={{ 
              marginBottom: '1.5rem', 
              color: '#94a3b8', 
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              position: 'relative',
              display: 'inline-block',
              paddingBottom: '0.5rem'
            }}>
              Proudly Supported By
              <span style={{
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #4ade80, transparent)'
              }} />
            </p>
            <div style={{ 
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              alignItems: 'center'
            }}>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                color: '#f8fafc',
                fontSize: '1.2rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                background: 'rgba(74, 222, 128, 0.05)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(74, 222, 128, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                margin: '0.5rem 0'
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #8b5cf6)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: 'gradient 3s linear infinite',
                }}>Borangi Technologies</span>
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(74, 222, 128, 0.1), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s ease',
                  pointerEvents: 'none',
                  animation: 'shine 2s infinite'
                }} />
              </div>
              <div style={{
                position: 'relative',
                display: 'inline-block',
                color: '#f8fafc',
                fontSize: '1.2rem',
                fontWeight: '500',
                padding: '0.5rem 1rem',
                borderRadius: '0.25rem',
                background: 'rgba(74, 222, 128, 0.05)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(74, 222, 128, 0.1)',
                transition: 'all 0.3s ease',
                cursor: 'default',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                margin: '0.5rem 0'
              }}>
                <span style={{
                  position: 'relative',
                  zIndex: 1,
                  background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundSize: '200% auto',
                  animation: 'gradient 3s linear infinite',
                }}>Moonlight Studios</span>
                <span style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s ease',
                  pointerEvents: 'none',
                  animation: 'shine 2s infinite 0.3s'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
