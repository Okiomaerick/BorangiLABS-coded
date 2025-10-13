import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaSearch, 
  FaServer, 
  FaDatabase, 
  FaCloud, 
  FaCode, 
  FaLock, 
  FaChartLine,
  FaShoppingCart,
  FaCreditCard,
  FaMobile
} from 'react-icons/fa';
import { 
  SiTypescript, 
  SiReact, 
  SiNodedotjs, 
  SiMongodb, 
  SiExpress,
  SiGithub,
  SiFlutter,
  SiFirebase
} from 'react-icons/si';
import './KnowledgeBase.css';

interface Article {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  slug: string;
}

const KnowledgeBase: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { 
      id: 'web-dev', 
      name: 'Web Development', 
      icon: <SiReact className="category-icon" />,
      description: 'Frontend and backend web development technologies, frameworks, and best practices.'
    },
    { 
      id: 'mobile', 
      name: 'Mobile Development', 
      icon: <FaMobile className="category-icon" />,
      description: 'Native and cross-platform mobile app development for iOS and Android.'
    },
    { 
      id: 'devops', 
      name: 'DevOps & Cloud', 
      icon: <FaServer className="category-icon" />,
      description: 'CI/CD, containerization, orchestration, and cloud infrastructure.'
    },
    { 
      id: 'database', 
      name: 'Database', 
      icon: <FaDatabase className="category-icon" />,
      description: 'SQL, NoSQL, data modeling, and database optimization techniques.'
    },
    { 
      id: 'security', 
      name: 'Security', 
      icon: <FaLock className="category-icon" />,
      description: 'Application security, authentication, and data protection best practices.'
    },
    { 
      id: 'cloud', 
      name: 'Cloud Services', 
      icon: <FaCloud className="category-icon" />,
      description: 'Cloud platforms, serverless, and managed services.'
    },
    {
      id: 'payments',
      name: 'Payment Integration',
      icon: <FaCreditCard className="category-icon" />,
      description: 'MPesa, credit card, and mobile money payment integrations.'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      icon: <FaShoppingCart className="category-icon" />,
      description: 'Online store setup, payment gateways, and e-commerce solutions.'
    },
    {
      id: 'analytics',
      name: 'Analytics',
      icon: <FaChartLine className="category-icon" />,
      description: 'Data analysis, visualization, and business intelligence tools.'
    },
    {
      id: 'api',
      name: 'API Development',
      icon: <FaCode className="category-icon" />,
      description: 'REST, GraphQL, and other API design and development.'
    }
  ];

  const popularArticles: Article[] = [
    {
      id: 1,
      title: 'Getting Started with React and TypeScript',
      category: 'Web Development',
      description: 'Comprehensive guide to setting up a new React project with TypeScript, including configuration, type definitions, and best practices for type safety.',
      icon: <SiReact className="article-icon" />,
      slug: 'getting-started-with-react-typescript'
    },
    {
      id: 2,
      title: 'Node.js Performance Optimization',
      category: 'Backend',
      description: 'Advanced techniques for optimizing Node.js application performance, including event loop management and memory optimization.',
      icon: <SiNodedotjs className="article-icon" />,
      slug: 'nodejs-performance-optimization'
    },
    {
      id: 3,
      title: 'MongoDB Schema Design Patterns',
      category: 'Database',
      description: 'In-depth look at common MongoDB schema design patterns and when to use them for optimal performance.',
      icon: <SiMongodb className="article-icon" />,
      slug: 'mongodb-schema-design'
    },
    {
      id: 4,
      title: 'Building Scalable APIs with Express',
      category: 'API Development',
      description: 'Learn how to design and implement scalable RESTful APIs using Express.js with best practices for performance and maintainability.',
      icon: <SiExpress className="article-icon" />,
      slug: 'building-scalable-apis-express'
    },
    {
      id: 5,
      title: 'CI/CD Pipeline with GitHub Actions',
      category: 'DevOps & Cloud',
      description: 'Step-by-step guide to setting up a complete CI/CD pipeline using GitHub Actions for automated testing and deployment.',
      icon: <SiGithub className="article-icon" />,
      slug: 'ci-cd-github-actions'
    },
    {
      id: 6,
      title: 'Mobile App Development with Flutter',
      category: 'Mobile Development',
      description: 'Introduction to cross-platform mobile app development using Flutter, including state management and native module integration.',
      icon: <SiFlutter className="article-icon" />,
      slug: 'mobile-app-development-flutter'
    },
    {
      id: 7,
      title: 'Payment Gateway Integration',
      category: 'Payment Integration',
      description: 'Guide to integrating MPesa and other payment gateways into your web and mobile applications with security best practices.',
      icon: <FaCreditCard className="article-icon" />,
      slug: 'payment-gateway-integration'
    },
    {
      id: 8,
      title: 'E-commerce Security Best Practices',
      category: 'Security',
      description: 'Essential security measures to protect your e-commerce platform from common vulnerabilities and attacks.',
      icon: <FaLock className="article-icon" />,
      slug: 'ecommerce-security-best-practices'
    },
    {
      id: 9,
      title: 'Real-time Analytics with Firebase',
      category: 'Analytics',
      description: 'Implementing real-time analytics and user tracking in your applications using Firebase Analytics.',
      icon: <SiFirebase className="article-icon" />,
      slug: 'realtime-analytics-firebase'
    },
    {
      id: 4,
      title: 'TypeScript Advanced Types',
      category: 'Web Development',
      description: 'Master advanced TypeScript types to write more robust and maintainable code.',
      icon: <SiTypescript className="article-icon" />,
      slug: 'typescript-advanced-types'
    }
  ];

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="knowledge-base">
      {/* Hero Section */}
      <section className="hero-section page-content">
        <div className="container">
          <h1>Knowledge Base</h1>
          <p className="subtitle">Find answers, guides, and tutorials to help you get the most out of our services</p>
          
          <div className="search-container">
            <div className="search-input">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search articles, guides, and more..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <Link to={`/knowledge-base/category/${category.id}`} key={category.id} className="category-card">
                <div className="category-icon-container">
                  {category.icon}
                </div>
                <h3>{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="popular-articles">
        <div className="container">
          <h2 className="section-title">Popular Articles</h2>
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <Link to={`/knowledge-base/article/${article.slug}`} key={article.id} className="article-card">
                <div className="article-icon-container">
                  {article.icon}
                </div>
                <div className="article-content">
                  <span className="article-category">{article.category}</span>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Can't find what you're looking for?</h2>
            <p>Our support team is here to help you with any questions or issues you might have.</p>
            <Link to="/contact" className="btn btn-primary">Contact Support</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeBase;
