import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  text: string | string[];
  speed?: number;
  loop?: boolean;
  delay?: number;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  loop = true,
  delay = 1000,
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [textArray] = useState(Array.isArray(text) ? text : [text]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const currentText = textArray[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentText) {
      // Pause at the end of typing
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delay);
    } else if (isDeleting && displayText === '') {
      // Move to next text or loop back
      setIsDeleting(false);
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % textArray.length);
      setCurrentIndex(0);
    } else {
      // Typing or deleting
      const delta = isDeleting ? -1 : 1;
      
      timeout = setTimeout(() => {
        setCurrentIndex((prevIndex) => prevIndex + delta);
        setDisplayText(currentText.substring(0, currentIndex + delta));
      }, isDeleting ? speed / 2 : speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, currentTextIndex, textArray, speed, delay]);

  return (
    <span className="typewriter-text">
      {displayText}
      <span className="typewriter-cursor">|</span>
    </span>
  );
};

export default Typewriter;
