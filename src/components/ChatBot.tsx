import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaTerminal, FaTimes, FaAngleDoubleRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import borangiLogo from '../assets/images/borangi-logo.jpeg';
import './ChatBot.css';

// Define response type that can be either a string or a function that returns a string
type TerminalResponse = string | ((input?: string) => string);

// Sample terminal commands and responses
const terminalResponses: { [key: string]: TerminalResponse } = {
  help: () => `Available commands:
  • help - Show this help message
  • about - Learn about BorangiLABS
  • services - View our services
  • contact - Get in touch
  • clear - Clear the terminal
  • version - Show version info
  • status - Show system status
  • time - Show current time
  • echo [text] - Repeat back the text
  • exit - Close the chatbot
  `,
  exit: () => 'Closing terminal...',
  version: () => 'BorangiLABS Terminal v2.4.1\nType "help" for available commands',
  status: () => 'System Status:\n  • Online\n  • Services: Operational\n  • Last Updated: Just now',
  time: () => `Current time: ${new Date().toLocaleTimeString()}\nDate: ${new Date().toLocaleDateString()}`,
  about: () => `BorangiLABS is a tech company specializing in innovative solutions.
  
  We provide cutting-edge services in:
  • Web Development
  • AI & Automation
  • POS Systems
  • Hardware Repair
  `,
  services: () => `Our Services:
  
  1. Web Development
     - Custom websites
     - E-commerce solutions
     - Web applications
  
  2. AI & Automation
     - AI integration
     - Process automation
     - Machine learning
  
  3. POS Systems
     - Retail solutions
     - Inventory management
     - Sales tracking
  
  4. Hardware Repair
     - Laptop/PC repair
     - Component replacement
     - System upgrades
  `,
  contact: () => `Contact Information:
  
  📞 Phone: +254 769 702 224
  ✉️ Email: borangiuser@gmail.com
  📍 Location: Nakuru, Kenya
  
  Type 'help' for more options.
  `,
  clear: () => '',
  echo: (input = '') => input.replace(/^echo\s+/, ''),
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isUser?: boolean; // Optional for backward compatibility
  isTyping?: boolean; // For typing indicators
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hello! I'm BorangiBot. How can I assist you today?",
    sender: 'bot',
    timestamp: new Date(),
    isUser: false,
    isTyping: false
  },
];

const quickReplies = [
  '$ services',
  '$ contact',
  '$ about',
  '$ help',
];

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  // Removed unused state variable
  // const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const createMessage = (text: string, sender: 'user' | 'bot', isTyping = false): Message => ({
    id: Date.now().toString(),
    text,
    sender,
    timestamp: new Date(),
    isUser: sender === 'user',
    isTyping
  });

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getBotResponse = (input: string): string | null => {
    // Helper function to safely get response value
    const getResponseValue = (response: TerminalResponse, inputParam?: string): string => {
      return typeof response === 'function' ? response(inputParam) : response;
    };
    const command = input.toLowerCase().trim();
    
    // Handle exit command
    if (command === 'exit') {
      const response = getResponseValue(terminalResponses.exit);
      // Show the message for 1.5 seconds before closing
      setTimeout(() => setIsOpen(false), 1500);
      return response;
    }
    
    // Handle clear command
    if (command === 'clear') {
      setMessages([createMessage(
        `BorangiLABS Terminal v2.4.1\nType 'help' for available commands\n--------------------------------`,
        'bot'
      )]);
      return null;
    }
    
    // Handle echo command
    if (command.startsWith('echo ')) {
      return getResponseValue(terminalResponses.echo, input);
    }
    
    // Handle time command
    if (command === 'time') {
      return getResponseValue(terminalResponses.time);
    }
    
    // Check for exact matches first
    const response = terminalResponses[command];
    if (response) {
      return getResponseValue(response);
    }
    
    // Check for partial matches
    for (const [key, response] of Object.entries(terminalResponses)) {
      if (command.includes(key)) {
        return getResponseValue(response);
      }
    }
    
    // Default response for unknown commands
    return `Command not found: ${command}\nType 'help' for available commands.`;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = createMessage(inputValue, 'user');
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input immediately
    setInputValue('');
    
    // Process command and get bot response
    const botResponse = getBotResponse(inputValue);
    
    if (botResponse === null) return;
    
    // Split response into lines and add them with a delay
    const responseLines = botResponse.split('\n').filter(line => line.trim() !== '');
    
    // Add typing indicator
    const typingMessage = createMessage('...', 'bot', true);
    setMessages(prev => [...prev, typingMessage]);
    
    // Remove typing indicator and add actual response after delay
    setTimeout(() => {
      setMessages(prev => {
        // Remove typing indicator
        const filtered = prev.filter(msg => !msg.isTyping);
        // Add response lines
        const responseMessages = responseLines.map((line, index) => 
          createMessage(line, 'bot')
        );
        return [...filtered, ...responseMessages];
      });
    }, 800);
  };

  const handleQuickReply = (text: string) => {
    setInputValue(text);
    // Trigger send after a small delay to allow state update
    setTimeout(() => {
      const button = document.getElementById('chatbot-send-button');
      if (button) button.click();
    }, 100);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen && inputRef.current) {
      // Focus input when opening chat
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Handle Ctrl+L to clear terminal
    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setMessages([
        createMessage(
          'Terminal cleared.\nType \'help\' for available commands',
          'bot'
        )
      ]);
    }
    // Handle up/down arrow for command history
    else if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      // Command history implementation would go here
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <motion.div 
          className="chatbot-window"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
          style={{
            backgroundImage: `url(${borangiLogo})`,
            backgroundSize: '50%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundBlendMode: 'overlay',
            backgroundColor: 'rgba(10, 14, 23, 0.95)'
          }}
        >
          <div className="chatbot-header">
            <div className="chatbot-title">
              <FaTerminal className="chatbot-icon" />
              <span>BorangiLABS Terminal</span>
            </div>
            <div className="chatbot-controls">
              {/* Window controls are now handled by the OS/window manager */}
            </div>
          </div>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isUser ? 'user' : 'bot'}`}
              >
                {!message.isUser && !message.text.includes('typing') && (
                  <span className="command-prompt">{'>'}</span>
                )}
                {message.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="quick-replies">
            {quickReplies.map((reply, index) => (
              <button
                key={index}
                className="quick-reply"
                onClick={() => handleQuickReply(reply)}
              >
                {reply}
              </button>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="chatbot-input-container">
            <span className="command-prompt">$</span>
            <input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={isTerminalMode ? 'Enter command...' : 'Type your message...'}
              className="chat-input"
              aria-label="Terminal input"
              autoComplete="off"
              spellCheck="false"
              autoCorrect="off"
              autoCapitalize="off"
            />
            <button type="submit" className="chatbot-send" title="Execute command">
              <FaAngleDoubleRight />
            </button>
          </form>
        </motion.div>
      )}

      <motion.button
        className={`chatbot-button ${isOpen ? 'active' : ''}`}
        onClick={toggleChat}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
      </motion.button>
    </div>
  );
};

export default ChatBot;
