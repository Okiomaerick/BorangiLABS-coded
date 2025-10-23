import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCode } from 'react-icons/fa';
import { SiTypescript, SiReact, SiNodedotjs, SiMongodb } from 'react-icons/si';
import Typewriter from './Typewriter';
import heroBg from '../assets/images/hero-bg.webp';
import './Hero.css';

// Icon components with explicit typing
const CodeIcon: React.FC<{ className?: string }> = ({ className = '' }) => (
  <FaCode className={`icon ${className}`} />
);

// Wrapper components for tech icons
const TechIcon: React.FC<{ icon: React.ReactElement; className?: string; title?: string }> = ({ 
  icon, 
  className = '', 
  title = '' 
}) => (
  <div className={`tech-icon ${className}`} title={title}>
    {React.cloneElement(icon, { className: 'tech-svg' })}
  </div>
);

const NewHero: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<'solution' | 'config'>('solution');
  const [activeSecondTab, setActiveSecondTab] = React.useState<'components' | 'styles'>('components');
  const [offsetY, setOffsetY] = useState(0);

  // Add parallax effect to background
  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.pageYOffset);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const secondCodeSnippets = {
    components: `// components/Button.tsx
import styled from 'styled-components';

interface ButtonProps {
  primary?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const Button = styled.button<ButtonProps>\`
  background: \${({ primary }) => (primary ? '#4f46e5' : 'transparent')};
  color: \${({ primary }) => (primary ? 'white' : '#4f46e5')};
  font-size: \${
    ({ size = 'medium' }) => 
      size === 'small' ? '0.8rem' : 
      size === 'large' ? '1.2rem' : '1rem'
  };
  padding: 0.5rem 1rem;
  border: 2px solid #4f46e5;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
\`;`,
    styles: `<span class="token comment">// styles/theme.ts</span>
<span class="token keyword">const</span> theme <span class="token operator">=</span> <span class="token punctuation">{</span>
  colors<span class="token operator">:</span> <span class="token punctuation">{</span>
    primary<span class="token operator">:</span> <span class="token string" style="color: #4f46e5">'#4f46e5'</span><span class="token punctuation">,</span>    <span class="token comment">// Indigo-600</span>
    secondary<span class="token operator">:</span> <span class="token string" style="color: #8b5cf6">'#8b5cf6'</span><span class="token punctuation">,</span>  <span class="token comment">// Violet-500</span>
    success<span class="token operator">:</span> <span class="token string" style="color: #10b981">'#10b981'</span><span class="token punctuation">,</span>    <span class="token comment">// Emerald-500</span>
    danger<span class="token operator">:</span> <span class="token string" style="color: #ef4444">'#ef4444'</span><span class="token punctuation">,</span>     <span class="token comment">// Red-500</span>
    warning<span class="token operator">:</span> <span class="token string" style="color: #f59e0b">'#f59e0b'</span><span class="token punctuation">,</span>    <span class="token comment">// Amber-500</span>
    info<span class="token operator">:</span> <span class="token string" style="color: #3b82f6">'#3b82f6'</span><span class="token punctuation">,</span>      <span class="token comment">// Blue-500</span>
    light<span class="token operator">:</span> <span class="token string" style="color: #f8fafc; background-color: #0f172a; padding: 0 2px;">'#f8fafc'</span><span class="token punctuation">,</span>     <span class="token comment">// Slate-50</span>
    dark<span class="token operator">:</span> <span class="token string" style="color: #0f172a; background-color: #f8fafc; padding: 0 2px;">'#0f172a'</span><span class="token punctuation">,</span>      <span class="token comment">// Slate-900</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  spacing<span class="token operator">:</span> <span class="token punctuation">{</span>
    xs<span class="token operator">:</span> <span class="token string">'0.25rem'</span><span class="token punctuation">,</span>  <span class="token comment">// 4px</span>
    sm<span class="token operator">:</span> <span class="token string">'0.5rem'</span><span class="token punctuation">,</span>   <span class="token comment">// 8px</span>
    md<span class="token operator">:</span> <span class="token string">'1rem'</span><span class="token punctuation">,</span>     <span class="token comment">// 16px</span>
    lg<span class="token operator">:</span> <span class="token string">'1.5rem'</span><span class="token punctuation">,</span>   <span class="token comment">// 24px</span>
    xl<span class="token operator">:</span> <span class="token string">'2rem'</span><span class="token punctuation">,</span>     <span class="token comment">// 32px</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  breakpoints<span class="token operator">:</span> <span class="token punctuation">{</span>
    sm<span class="token operator">:</span> <span class="token string">'640px'</span><span class="token punctuation">,</span>    <span class="token comment">// Small screens</span>
    md<span class="token operator">:</span> <span class="token string">'768px'</span><span class="token punctuation">,</span>    <span class="token comment">// Tablets</span>
    lg<span class="token operator">:</span> <span class="token string">'1024px'</span><span class="token punctuation">,</span>   <span class="token comment">// Laptops</span>
    xl<span class="token operator">:</span> <span class="token string">'1280px'</span><span class="token punctuation">,</span>   <span class="token comment">// Desktops</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  shadows<span class="token operator">:</span> <span class="token punctuation">{</span>
    sm<span class="token operator">:</span> <span class="token string">'0 1px 2px 0 rgb(0 0 0 / 0.05)'</span><span class="token punctuation">,</span>
    <span class="token constant">DEFAULT</span><span class="token operator">:</span> <span class="token string">'0 1px 3px 0 rgb(0 0 0 / 0.1)'</span><span class="token punctuation">,</span>
    md<span class="token operator">:</span> <span class="token string">'0 4px 6px -1px rgb(0 0 0 / 0.1)'</span><span class="token punctuation">,</span>
    lg<span class="token operator">:</span> <span class="token string">'0 10px 15px -3px rgb(0 0 0 / 0.1)'</span><span class="token punctuation">,</span>
    xl<span class="token operator">:</span> <span class="token string">'0 20px 25px -5px rgb(0 0 0 / 0.1)'</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>`
  };

  const codeSnippets = {
    solution: `<span class="token comment">// Welcome to BorangiLABS</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> createAmazing <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">'borangi-solutions'</span><span class="token punctuation">;</span>

<span class="token keyword">class</span> <span class="token class-name">YourBusiness</span> <span class="token punctuation">{</span>
  <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>techStack <span class="token operator">=</span> <span class="token punctuation">[</span>
      <span class="token string">'React'</span><span class="token punctuation">,</span> <span class="token string">'Node.js'</span><span class="token punctuation">,</span> <span class="token string">'TypeScript'</span><span class="token punctuation">,</span>
      <span class="token string">'MongoDB'</span><span class="token punctuation">,</span> <span class="token string">'AI/ML'</span><span class="token punctuation">,</span> <span class="token string">'Cloud'</span>
    <span class="token punctuation">]</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token keyword">async</span> <span class="token function">transform</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> solution <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">createAmazing</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
      business<span class="token operator">:</span> <span class="token string">'your-business'</span><span class="token punctuation">,</span>
      services<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'web'</span><span class="token punctuation">,</span> <span class="token string">'mobile'</span><span class="token punctuation">,</span> <span class="token string">'ai'</span><span class="token punctuation">,</span> <span class="token string">'cloud'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      success<span class="token operator">:</span> <span class="token string">'guaranteed'</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token keyword">return</span> solution<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// Let's build something amazing together!</span>`,
    config: `// Project Configuration
{
  "name": "your-project",
  "version": "1.0.0",
  "description": "Powered by BorangiLABS",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "^13.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@borangi/ui": "latest"
  },
  "borangi": {
    "features": ["analytics", "seo", "performance"]
  }
}`
  };

  return (
    <section 
      className="new-hero"
      style={{
        '--parallax-offset': `${offsetY * 0.5}px`,
        '--hero-bg': `url(${heroBg})`
      } as React.CSSProperties}
    >
      <div className="new-hero-content">
        <div className="new-hero-text">
          <h1 className="new-hero-title">
            <span>Code</span> Your Business <span>Future</span>
          </h1>
          
          <p className="new-hero-subtitle">
            We craft <span>digital experiences</span> that drive results.
            <br />
            <Typewriter 
              text={[
                'Full-stack solutions from concept to deployment.',
                'AI-powered applications that scale with your business.',
                'Custom software that solves real business challenges.',
                'Secure, scalable, and maintainable codebases.',
                'Innovative technology for forward-thinking businesses.'
              ]} 
              speed={50}
              delay={2000}
              loop={true}
            />
          </p>
          
          <div className="new-tech-stack">
            <TechIcon icon={<SiTypescript />} title="TypeScript" />
            <TechIcon icon={<SiReact />} title="React" />
            <TechIcon icon={<SiNodedotjs />} title="Node.js" />
            <TechIcon icon={<SiMongodb />} title="MongoDB" />
          </div>
          
          <div className="new-cta-buttons">
            <Link 
              to="/contact" 
              className="new-btn new-btn-primary"
              onClick={(e) => {
                e.preventDefault();
                navigate('/contact');
                window.scrollTo(0, 0);
              }}
            >
              Get Started
            </Link>
            
            <button 
              className="new-btn new-btn-outline"
              onClick={() => scrollToSection('services')}
            >
              Our Services
            </button>
          </div>
        </div>
        
        <div className="new-code-editor">
          <div className="editor-tabs">
            <button 
              className={`tab ${activeTab === 'solution' ? 'active' : ''}`}
              onClick={() => setActiveTab('solution')}
            >
              <CodeIcon /> solution.jsx
            </button>
            <button 
              className={`tab ${activeTab === 'config' ? 'active' : ''}`}
              onClick={() => setActiveTab('config')}
            >
              <CodeIcon /> config.json
            </button>
          </div>
          
          <div className="editor-content">
            <pre className="code-block">
              <code dangerouslySetInnerHTML={{ __html: codeSnippets[activeTab] }} />
            </pre>
          </div>
        </div>

        <div className="new-code-editor second-editor">
          <div className="editor-tabs">
            <button 
              className={`tab ${activeSecondTab === 'components' ? 'active' : ''}`}
              onClick={() => setActiveSecondTab('components')}
            >
              <CodeIcon /> Button.tsx
            </button>
            <button 
              className={`tab ${activeSecondTab === 'styles' ? 'active' : ''}`}
              onClick={() => setActiveSecondTab('styles')}
            >
              <CodeIcon /> theme.ts
            </button>
          </div>
          
          <div className="editor-content">
            <pre className="code-block">
              <code 
                className={`language-${activeSecondTab === 'components' ? 'typescript' : 'json'}`}
                dangerouslySetInnerHTML={{ 
                  __html: typeof secondCodeSnippets[activeSecondTab] === 'string' 
                    ? secondCodeSnippets[activeSecondTab] 
                    : '' 
                }} 
              />
            </pre>
          </div>
        </div>
        
        <div className="hero-callout">
          <div className="callout-content">
            <span className="callout-text">Innovative</span>
            <span className="callout-highlight">Software {`{Development}`}</span>
            <div className="callout-subtext">
              Transforming ideas into powerful digital solutions
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHero;
