import React, { useState } from 'react';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import borangiLogo from '../assets/images/borangi-logo.jpeg';
import './WhatsAppButton.css';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const phoneNumber = '254769702224'; // Your WhatsApp number without '+' or '00'
  const defaultMessage = 'Hello BorangiLABS, I have a question about your services.';
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = message || defaultMessage;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  const chatWindowStyle = {
    '--chat-bg': 'rgba(10, 25, 47, 0.95)',
    '--chat-header': '#0f2a4f',
    '--chat-bubble-bot': '#1f3a60',
    '--chat-bubble-user': '#3a86ff',
    '--chat-input-bg': '#0f2a4f',
    '--chat-border': 'rgba(255, 255, 255, 0.1)',
    backgroundImage: `url(${borangiLogo})`,
    backgroundSize: '60%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundBlendMode: 'overlay',
    backgroundColor: 'rgba(10, 25, 47, 0.95)'
  } as React.CSSProperties;

  return (
    <div className={`whatsapp-container ${isOpen ? 'chat-open' : ''}`}>
      {isOpen && (
        <div className="whatsapp-chat-window" style={chatWindowStyle}>
          <div className="chat-header">
            <div className="chat-title">
              <FaWhatsapp className="chat-title-icon" />
              <span>Chat with Us</span>
            </div>
            <button 
              className="close-chat" 
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Close chat"
            >
              <FaTimes />
            </button>
          </div>
          <div className="chat-body">
            <div className="chat-message bot-message">
              <p>Hello! 👋</p>
              <p>How can we help you today?</p>
            </div>
            <form onSubmit={handleSendMessage} className="chat-form">
              <div className="form-group">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  rows={3}
                  className="chat-input"
                  aria-label="Type your message"
                />
                <button type="submit" className="send-button" aria-label="Send message">
                  <FaPaperPlane />
                </button>
              </div>
              <small className="chat-note">
                By clicking send, you'll be redirected to WhatsApp to complete your message.
              </small>
            </form>
          </div>
        </div>
      )}
      
      <button 
        className="whatsapp-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        <FaWhatsapp className="whatsapp-icon" />
        <span className="whatsapp-tooltip">{isOpen ? 'Close Chat' : 'Chat with Us'}</span>
      </button>
    </div>
  );
};

export default WhatsAppButton;
