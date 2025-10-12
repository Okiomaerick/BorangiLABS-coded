import React, { useEffect, useState } from 'react';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Team from './components/Team';
import BlogPreview from './components/BlogPreview';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import Contact from './components/Contact';
import ContactPage from './pages/ContactPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import ServiceDetail from './pages/ServiceDetail';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CareerPage from './pages/CareerPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import KnowledgeBaseCategory from './pages/KnowledgeBaseCategory';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import ScrollToTopButton from './components/ScrollToTopButton';
import HashHandler from './components/HashHandler';
import LoadingScreen from './components/LoadingScreen';
import './index.css';
import './components/Components.css';
import './pages/BlogPage.css';
import './pages/BlogDetailPage.css';
import './pages/CareerPage.css';

function Home() {
  return (
    <main className="main-content">
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Team />
      <Testimonials />
      <FAQSection />
      <BlogPreview />
      <Contact />
    </main>
  );
}

// Component to handle scroll restoration
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    // Reset scroll state on pathname change
    setHasScrolled(false);
    
    // Immediate scroll to top
    window.scrollTo(0, 0);
    
    // Set a flag to indicate we've done the initial scroll
    const scrollTimer = setTimeout(() => {
      setHasScrolled(true);
    }, 50);
    
    return () => clearTimeout(scrollTimer);
  }, [pathname]);

  useEffect(() => {
    // Only handle hash navigation after the initial scroll
    if (!hasScrolled) return;
    
    if (hash) {
      const scrollToElement = () => {
        const element = document.getElementById(hash.replace('#', ''));
        if (element) {
          const headerOffset = 100; // Adjust based on your header height
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      };
      
      // Small delay to ensure the DOM is updated
      const timer = setTimeout(scrollToElement, 50);
      return () => clearTimeout(timer);
    }
  }, [hash, hasScrolled]);

  return null;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (2 seconds)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div className="app">
        <Header />
        <MobileNav />
        <ScrollToTop />
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <>
            <HashHandler>
              <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/careers" element={<CareerPage />} />
            <Route path="/knowledge-base" element={<KnowledgeBasePage />} />
            <Route path="/knowledge-base/category/:categoryId" element={<KnowledgeBaseCategory />} />
            {/* Add explicit routes for known paths that should show 404 */}
            <Route path="/labs" element={<Navigate to="/404" replace />} />
            <Route path="/labs*" element={<Navigate to="/404" replace />} />
            <Route path="/isp*" element={<Navigate to="/404" replace />} />
            {/* Catch-all route for any other undefined paths */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
              </main>
            </HashHandler>
            <ScrollToTopButton />
            <Footer />
            <WhatsAppButton />
            <ChatBot />
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
