import React, { useEffect, useRef, useState } from 'react';

interface TerminalTextProps {
  text: string;
  className?: string;
}

const TerminalText: React.FC<TerminalTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed] = useState(50); // Even faster typing speed
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyped, setIsTyped] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const typeText = () => {
      if (isDeleting) {
        // Deleting text
        if (currentIndex > 0) {
          setDisplayText(text.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
          timeoutId = setTimeout(typeText, 30); // Even faster deleting
        } else {
          // Finished deleting, start typing again
          setIsDeleting(false);
          setCurrentIndex(0);
          timeoutId = setTimeout(typeText, 500);
        }
      } else {
        // Typing text
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
          timeoutId = setTimeout(typeText, typingSpeed);
        } else {
          // Finished typing, wait then start deleting
          if (!isTyped) {
            setIsTyped(true);
            timeoutId = setTimeout(() => {
              setIsDeleting(true);
              timeoutId = setTimeout(typeText, 50); // Minimal pause before starting to type again
            }, 1000); // Shorter pause at the end of typing
          } else {
            setIsDeleting(true);
            timeoutId = setTimeout(typeText, 500);
          }
        }
      }
    };

    // Start the typing effect
    timeoutId = setTimeout(typeText, 1000);

    // Store the current timer ref
    const currentTimer = timerRef.current;
    
    // Cleanup function
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (currentTimer) clearTimeout(currentTimer);
    };
  }, [text, currentIndex, isDeleting, typingSpeed, isTyped]);

  return (
    <h3 className={`terminal-text ${className}`}>
      {displayText}
      <span className="cursor">|</span>
    </h3>
  );
};

export default TerminalText;
