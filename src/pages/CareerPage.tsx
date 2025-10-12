import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useForm } from '@formspree/react';
import './CareerPage.css';

// Define form values type
interface FormValues {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  message: string;
  cv: FileList | null;
  subscribe: boolean;
}

const CareerPage: React.FC = () => {
  const [state, handleSubmitFormspree] = useForm('mgvnodka');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string>('');
  const [formData, setFormData] = useState<FormValues>({
    fullName: '',
    email: '',
    phone: '',
    position: '',
    message: '',
    cv: null,
    subscribe: true
  });
  // Define a type for form errors that maps each form field to an optional error message
  type FormErrors = {
    fullName?: string;
    email?: string;
    phone?: string;
    position?: string;
    message?: string;
    cv?: string;
    subscribe?: string;
    submit?: string;
  };

  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string): boolean => {
    const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return re.test(email);
  };

  const validateFile = (file: File | undefined): string | null => {
    if (!file) return 'CV is required';
    
    const validTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (file.size > 5 * 1024 * 1024) {
      return 'File size should be less than 5MB';
    }
    
    if (!validTypes.includes(file.type)) {
      return 'Only PDF, DOC, and DOCX files are allowed';
    }
    
    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'file') {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files?.[0];
      
      if (file) {
        setFileName(file.name);
        setFormData(prev => ({ ...prev, cv: fileInput.files }));
        
        const fileError = validateFile(file);
        setErrors(prev => ({
          ...prev,
          cv: fileError || undefined
        }));
      }
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Clear error when user types
      if (errors[name as keyof FormErrors]) {
        setErrors(prev => ({
          ...prev,
          [name]: undefined
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.cv || formData.cv.length === 0) {
      newErrors.cv = 'CV is required';
    } else if (formData.cv[0]) {
      const fileError = validateFile(formData.cv[0]);
      if (fileError) {
        newErrors.cv = fileError;
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission success
  useEffect(() => {
    if (state.succeeded) {
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        position: '',
        message: '',
        cv: null,
        subscribe: true
      });
      setFileName('');
      setErrors({});
      setIsSuccess(true);
      // Reset success message after 5 seconds
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('fullName', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position', formData.position || 'Career Application');
      formDataToSend.append('message', formData.message);
      formDataToSend.append('subscribe', String(formData.subscribe));
      formDataToSend.append('_subject', `New Career Application: ${formData.fullName}`);
      formDataToSend.append('_format', 'plain');
      
      // Add CV file if exists
      if (formData.cv?.[0]) {
        formDataToSend.append('cv', formData.cv[0]);
      }
      
      // Submit to Formspree
      await handleSubmitFormspree(formDataToSend);
      
      // Reset form on success will be handled by the effect above
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to submit the form. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main-content">
      <div className="career-page">
        <section className="career-hero">
        <div className="container">
          <h1>Join Our Team</h1>
          <p className="subtitle">Be part of something great. Explore opportunities to grow with us.</p>
        </div>
      </section>

      <section className="career-content">
        <div className="container">
          <div className="career-grid">
            <div className="career-info">
              <h2>Why Work With Us?</h2>
              <p>
                At BorangiLABS, we're building the future of technology. We value innovation, 
                creativity, and a passion for excellence. Join our team of talented professionals 
                and work on exciting projects that make a real impact.
              </p>
              
              <div className="benefits">
                <h3>What We Offer</h3>
                <ul>
                  <li>Competitive salary and benefits</li>
                  <li>Flexible working hours</li>
                  <li>Remote work opportunities</li>
                  <li>Professional development</li>
                  <li>Dynamic and inclusive work environment</li>
                  <li>Cutting-edge technology stack</li>
                </ul>
              </div>
              
              <div className="current-openings">
                <h3>Current Openings</h3>
                <p>We're always looking for talented individuals to join our team. Even if you don't see a position that matches your skills, we'd still love to hear from you!</p>
                <div className="job-list">
                  <div className="job-item">
                    <h4>Senior Frontend Developer</h4>
                    <span className="job-location">Remote / On-site</span>
                    <span className="job-type">Full-time</span>
                  </div>
                  <div className="job-item">
                    <h4>UX/UI Designer</h4>
                    <span className="job-location">Remote / On-site</span>
                    <span className="job-type">Full-time</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="career-form-container">
              <div className="career-form-card">
                <h2>Submit Your Application</h2>
                <p>Fill out the form below and we'll get back to you when opportunities arise.</p>
                
                {isSuccess && (
                  <div className="success-message">
                    <span className="success-icon">✓</span>
                    <span>Thank you for your submission! We'll be in touch soon.</span>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="career-form" noValidate>
                  {errors.submit && (
                    <div className="error-message mb-3">
                      {errors.submit}
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="fullName">Full Name *</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                      placeholder="John Doe"
                      disabled={state.submitting}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.fullName}
                      aria-describedby={errors.fullName ? 'fullNameError' : undefined}
                    />
                    {errors.fullName && (
                      <span id="fullNameError" className="error-message">
                        {errors.fullName}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="your.email@example.com"
                      disabled={state.submitting}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'emailError' : undefined}
                    />
                      {errors.email && (
                        <span id="emailError" className="error-message">
                          {errors.email}
                        </span>
                      )}
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="+254 700 000000"
                      disabled={state.submitting}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? 'phoneError' : undefined}
                    />
                      {errors.phone && (
                        <span id="phoneError" className="error-message">
                          {errors.phone}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="position">Position of Interest</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className={`form-control ${errors.position ? 'is-invalid' : ''}`}
                      placeholder="E.g., Frontend Developer, UX Designer"
                      disabled={state.submitting}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.position}
                      aria-describedby={errors.position ? 'positionError' : undefined}
                    />
                    {errors.position && (
                      <span id="positionError" className="error-message">
                        {errors.position}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Cover Letter / Message</label>
                    <textarea
                      id="message"
                      name="message"
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us why you'd be a great fit..."
                      disabled={state.submitting}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'messageError' : undefined}
                    ></textarea>
                    {errors.message && (
                      <span id="messageError" className="error-message">
                        {errors.message}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group file-upload">
                    <label htmlFor="cv">
                      CV / Resume *
                      <div 
                        className={`file-upload-box ${errors.cv ? 'is-invalid' : ''}`}
                        role="button"
                        aria-label="Click to upload CV"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            document.getElementById('cv')?.click();
                          }
                        }}
                      >
                        <span className="upload-icon" aria-hidden="true">📎</span>
                        <div className="file-info">
                          {fileName ? (
                            <span className="file-name">{fileName}</span>
                          ) : (
                            <>
                              <span className="upload-text">Upload your CV (PDF, DOC, DOCX, max 5MB)</span>
                              <span className="file-types">PDF, DOC, DOCX</span>
                            </>
                          )}
                        </div>
                        <input
                          type="file"
                          id="cv"
                          name="cv"
                          accept=".pdf,.doc,.docx"
                          className={`file-input ${errors.cv ? 'is-invalid' : ''}`}
                          onChange={handleChange}
                          disabled={state.submitting}
                          required
                          aria-required="true"
                          aria-invalid={!!errors.cv}
                          aria-describedby={errors.cv ? 'cvError' : undefined}
                        />
                      </div>
                    </label>
                    {errors.cv && (
                      <span id="cvError" className="error-message">
                        {errors.cv}
                      </span>
                    )}
                  </div>
                  
                  <div className="form-group checkbox-group">
                    <input
                      type="checkbox"
                      id="subscribe"
                      name="subscribe"
                      className="custom-checkbox"
                      checked={formData.subscribe}
                      onChange={handleChange}
                      disabled={state.submitting}
                      aria-invalid={!!errors.subscribe}
                      aria-describedby={errors.subscribe ? 'subscribeError' : undefined}
                    />
                    <label htmlFor="subscribe" className="checkbox-label">
                      Subscribe to our job alerts
                    </label>
                    {errors.subscribe && (
                      <span id="subscribeError" className="error-message">
                        {errors.subscribe}
                      </span>
                    )}
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    disabled={isSubmitting || state.submitting}
                  >
                    {isSubmitting || state.submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                  
                  {state.succeeded && (
                    <div className="form-success" style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#4caf50',
                      color: 'white',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}>
                      Thank you for your application! We'll review your information and get back to you soon.
                    </div>
                  )}
                  
                  {state.errors && (
                    <div className="form-error" style={{
                      marginTop: '1rem',
                      padding: '1rem',
                      backgroundColor: '#f44336',
                      color: 'white',
                      borderRadius: '4px',
                      textAlign: 'center'
                    }}>
                      Oops! There was an error submitting your application. Please try again.
                    </div>
                  )}
                  
                  <p className="form-note">
                    By submitting this form, you agree to our <a href="/privacy-policy">Privacy Policy</a> and consent to us 
                    storing your information and contacting you regarding career opportunities.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
};

export default CareerPage;
