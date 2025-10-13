import { useCallback, useEffect, useRef, useState } from 'react';

// Import local images
import jakePodcastImg from '../assets/portfolio/jake-podcast.webp';
import kibaruaHiveImg from '../assets/portfolio/kibarua-hive.webp';
import classroomOsImg from '../assets/portfolio/classroom-OS.webp';
import borangiNmsImg from '../assets/portfolio/borangi-NMS.webp';
import backyardKinyoziImg from '../assets/portfolio/backyard-kinyozi.webp';
import shadowFeedImg from '../assets/portfolio/shadow-feed_AGORA.webp';


const Portfolio: React.FC = () => {
  const baseProjects = [
    {
      id: 1,
      title: 'Jake Podcast Show',
      description: 'Audio podcast streaming platform',
      image: jakePodcastImg,
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Podcast API'],
      category: 'Web Development'
    },
    {
      id: 2,
      title: 'KibaruaHive',
      description: 'Skilled worker platform',
      image: kibaruaHiveImg,
      tags: ['React', 'Node.js', 'PostgreSQL', 'Redis'],
      category: 'Web Application'
    },
    {
      id: 3,
      title: 'classroomOS',
      description: 'Modern learning system',
      image: classroomOsImg,
      tags: ['Vue.js', 'Laravel', 'MySQL', 'AWS'],
      category: 'E-learning'
    },
    {
      id: 4,
      title: 'BorangiNMS',
      description: 'Network management system',
      image: borangiNmsImg,
      tags: ['Angular', 'Python', 'PostgreSQL', 'Docker', 'SNMP'],
      category: 'Network Management'
    },
    {
      id: 5,
      title: 'Backyard Kinyozi',
      description: 'Barber booking app',
      image: backyardKinyoziImg,
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'Web Development'
    },
    {
      id: 6,
      title: 'ShadowFeed: The Agora',
      description: 'Secure anonymous platform',
      image: shadowFeedImg,
      tags: ['React', 'Node.js', 'WebRTC', 'End-to-End Encryption'],
      category: 'Privacy Platform'
    }
  ];

  const [isMobileView, setIsMobileView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Create two sets of projects for seamless looping
  const projects = [...baseProjects, ...baseProjects];
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPosition = useRef(0);
  const scrollSpeed = 0.5; // Slower scroll speed
  const isDragging = useRef(false);
  // Removed unused refs
  // const startX = useRef(0);
  // const scrollLeft = useRef(0);

  // Handle window resize and mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobileView(mobile);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!scrollContainerRef.current || isPaused || isDragging.current) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;
    
    if (maxScroll <= 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }
    
    scrollPosition.current += scrollSpeed;
    
    // Reset position when reaching the end of the first set
    if (scrollPosition.current >= maxScroll / 2) {
      scrollPosition.current = 0;
      container.scrollLeft = 0;
    } else {
      container.scrollLeft = scrollPosition.current;
    }
    
    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  // Start/stop animation on mount/unmount
  useEffect(() => {
    if (!isMobileView) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isMobileView]);

  // Mouse and touch event handlers for manual scrolling (commented out for now)
  // These can be re-enabled when implementing manual scroll functionality
  /*
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleMouseLeave = () => {
    isDragging.current = false;
    setIsPaused(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    scrollLeft.current = scrollContainerRef.current?.scrollLeft || 0;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0);
    const walk = (x - startX.current) * 2;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 1000);
  };
  */

  return (
    <section id="portfolio" className="portfolio-section">
      <div className="container">
        <div className="section-header">
          <h2>Our Portfolio</h2>
          <p>Explore our latest projects and success stories</p>
        </div>

        <div 
          className="portfolio-scroll-container"
          ref={scrollContainerRef}
        >
          <div className="portfolio-horizontal-scroll">
            {projects.map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
                className={`portfolio-item ${hoveredItem === project.id ? 'hovered' : ''}`}
                aria-label={`Project: ${project.title}`}
                onMouseEnter={() => {
                  setIsPaused(true);
                  setHoveredItem(project.id);
                }}
                onMouseLeave={() => {
                  setIsPaused(false);
                  setHoveredItem(null);
                }}
              >
                <div className="portfolio-image">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="portfolio-img"
                    loading="lazy"
                  />
                  <div className="portfolio-overlay">
                    <div className="portfolio-content">
                      <span className="portfolio-category">{project.category}</span>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      <div className="portfolio-tags">
                        {project.tags.map((tag, i) => {
                          // Convert tag to lowercase and replace special characters for class name
                          const tagClass = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          return (
                            <span 
                              key={i} 
                              className={`tag ${tagClass}`}
                              aria-label={`Technology: ${tag}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="portfolio-cta">
          <p>Have a project in mind? Let's work together!</p>
          <a href="#contact" className="btn btn-primary">
            Get in Touch
            <svg className="icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
