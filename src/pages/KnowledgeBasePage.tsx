import React, { useEffect } from 'react';
import KnowledgeBase from './KnowledgeBase';

const KnowledgeBasePage: React.FC = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="main-content">
      <KnowledgeBase />
    </main>
  );
};

export default KnowledgeBasePage;
