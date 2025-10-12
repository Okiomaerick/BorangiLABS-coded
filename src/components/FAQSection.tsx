import React, { useState } from 'react';
import './FAQSection.css';

interface FAQItem {
  id: number;
  question: string;
  answer: React.ReactNode;
}

const FAQSection: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const toggleAccordion = (id: number) => {
    setActiveId(activeId === id ? null : id);
  };

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "How do I integrate M-Pesa payments into my website?",
      answer: (
        <div>
          <p>Integrating M-Pesa into your website involves these key steps:</p>
          <ol>
            <li>Register for the M-Pesa Daraja API on the Safaricom Developer Portal</li>
            <li>Obtain your API credentials (Consumer Key and Secret)</li>
            <li>Choose your integration method:
              <ul>
                <li>STK Push (Lipa Na M-Pesa Online)</li>
                <li>C2B (Customer to Business)</li>
                <li>B2C (Business to Customer)</li>
              </ul>
            </li>
            <li>Implement the necessary API calls in your backend</li>
            <li>Test thoroughly in the sandbox environment before going live</li>
          </ol>
          <p>Our team can handle the entire integration process for you, ensuring a smooth and secure implementation.</p>
        </div>
      )
    },
    {
      id: 2,
      question: "What are your working hours for support?",
      answer: "Our support team is available Monday to Friday from 8:00 AM to 6:00 PM EAT. For urgent issues outside these hours, we offer emergency support for enterprise clients with priority support packages."
    },
    {
      id: 3,
      question: "How long does it take to develop a custom web application?",
      answer: "The development timeline varies based on project complexity. A basic website typically takes 4-6 weeks, while more complex web applications can take 3-6 months. We'll provide a detailed timeline after our initial consultation."
    },
    {
      id: 4,
      question: "Do you offer website maintenance services?",
      answer: "Yes, we offer comprehensive maintenance packages that include regular updates, security patches, performance optimization, and content updates. Our maintenance plans are customizable based on your specific needs."
    },
    {
      id: 5,
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including M-Pesa, bank transfers, and credit/debit cards. We can also integrate any other local payment methods your business requires."
    },
    {
      id: 6,
      question: "Can you help with domain registration and hosting?",
      answer: "Absolutely! We offer domain registration, professional email setup, and reliable hosting services. We can also help you transfer existing domains and hosting to our secure, high-performance servers."
    },
    {
      id: 7,
      question: "What's included in your digital marketing services?",
      answer: "Our digital marketing services include SEO, social media management, content creation, PPC advertising, email marketing, and analytics. We create customized strategies based on your business goals and target audience."
    },
    {
      id: 8,
      question: "How do you ensure website security?",
      answer: "We implement multiple security layers including SSL certificates, regular security audits, DDoS protection, malware scanning, and secure coding practices. We also provide security training and ongoing monitoring to keep your site protected."
    }
  ];

  return (
    <section className="faq-section" id="faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-subtitle">Find answers to common questions about our services and support</p>
        
        <div className="faq-container">
          {faqs.map((faq) => (
            <div 
              key={faq.id} 
              className={`faq-item ${activeId === faq.id ? 'active' : ''}`}
            >
              <button 
                className="faq-question"
                onClick={() => toggleAccordion(faq.id)}
                aria-expanded={activeId === faq.id}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <span>{faq.question}</span>
                <span className="toggle-icon">
                  {activeId === faq.id ? '−' : '+'}
                </span>
              </button>
              <div 
                id={`faq-answer-${faq.id}`}
                className="faq-answer"
                role="region"
                aria-hidden={activeId !== faq.id}
              >
                <div className="faq-answer-content">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="faq-cta">
          <p>Still have questions? We're here to help!</p>
          <a href="/contact" className="btn btn-primary">Contact Our Support</a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
