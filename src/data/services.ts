import { Service } from '../types/service';

export const services: Service[] = [
  {
    id: 'hardware-repair',
    slug: 'hardware-repair',
    title: 'Computer Hardware Repair',
    description: 'Professional repair services for all your computing devices',
    price: 'Diagnosis: KSh 1,000',
    features: [
      'Laptop & Desktop Repairs',
      'Component-Level Diagnostics',
      'Data Recovery Services',
      'Hardware Upgrades',
      'Virus & Malware Removal',
      'Operating System Installation'
    ],
    details: 'Our expert technicians provide comprehensive hardware repair services for all major brands and models. We handle everything from simple upgrades to complex component-level repairs.',
    icon: '🔧',
    image: '/src/assets/services/hardware-repair-bg.webp',
    websiteTypes: [
      {
        name: 'Laptop Repairs',
        description: 'Professional repair services for all laptop brands and models'
      },
      {
        name: 'Desktop Computers',
        description: 'Diagnosis and repair of desktop computer hardware issues'
      },
      {
        name: 'Gaming Systems',
        description: 'Specialized repair and upgrades for gaming PCs and consoles'
      },
      {
        name: 'Data Recovery',
        description: 'Professional data recovery from damaged or corrupted storage devices'
      },
      {
        name: 'Preventive Maintenance',
        description: 'Regular maintenance to prevent hardware failures and extend device lifespan'
      }
    ],
    techStack: {
      diagnostic: ['PC-Doctor', 'HWMonitor', 'CrystalDiskInfo', 'MemTest86'],
      repair: ['ESD Tools', 'Soldering Stations', 'BGA Rework', 'Oscilloscopes'],
      software: ['Windows', 'macOS', 'Linux', 'Data Recovery Tools'],
      certifications: ['CompTIA A+', 'Microsoft Certified', 'Apple Certified']
    },
    process: [
      'Initial diagnosis and assessment',
      'Detailed quote and approval',
      'Professional repair using industry-standard tools',
      'Thorough testing and quality assurance',
      'Final verification and data backup',
      'Return of device with warranty'
    ],
    benefits: [
      'Certified technicians with years of experience',
      '90-day warranty on all repairs',
      'Free diagnostic service with repair',
      'Same-day service for common issues',
      'Transparent pricing with no hidden fees',
      'Data privacy guaranteed'
    ]
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    description: 'Custom websites and web applications tailored to your needs',
    price: 'Starting at KSh 15,000',
    features: [
      'Responsive & Mobile-First Design',
      'SEO Optimization & Analytics',
      'Content Management System (CMS)',
      'E-commerce Solutions',
      'Web Hosting & Domain Setup',
      'SSL Security & Maintenance'
    ],
    details: 'We create beautiful, functional websites and web applications using the latest technologies. Our solutions are mobile-friendly, fast, and optimized for search engines.',
    icon: '💻',
    websiteTypes: [
      {
        name: 'Business Websites',
        description: 'Professional websites to showcase your business and services'
      },
      {
        name: 'E-commerce Stores',
        description: 'Online stores with secure payment processing and inventory management'
      },
      {
        name: 'Web Applications',
        description: 'Custom web applications with user authentication and database integration'
      },
      {
        name: 'Portfolio Sites',
        description: 'Showcase your work and attract new clients'
      },
      {
        name: 'Blogs & Content Portals',
        description: 'Publish and manage your content with ease'
      }
    ],
    techStack: {
      frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Material-UI'],
      backend: ['Node.js', 'Express', 'Python', 'Django', 'PHP', 'Laravel'],
      databases: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase'],
      cms: ['WordPress', 'Strapi', 'Contentful', 'Sanity'],
      ecommerce: ['Shopify', 'WooCommerce', 'Magento'],
      devops: ['Docker', 'AWS', 'Vercel', 'Netlify', 'GitHub Actions']
    },
    process: [
      'Initial consultation and requirements gathering',
      'Planning and wireframing',
      'UI/UX design',
      'Development and implementation',
      'Testing and quality assurance',
      'Deployment and launch',
      'Ongoing maintenance and support'
    ],
    benefits: [
      'Mobile-responsive design that works on all devices',
      'Fast loading times and optimized performance',
      'SEO-friendly structure for better search engine visibility',
      'Secure and scalable architecture',
      'User-friendly content management system',
      'Ongoing support and maintenance packages available'
    ]
  },
  {
    id: 'pos-systems',
    slug: 'pos-systems',
    title: 'POS Systems',
    description: 'Comprehensive Point of Sale solutions for retail, hospitality, and service businesses',
    price: 'Starting at KSh 20,000',
    features: [
      'Real-time Inventory Management',
      'Detailed Sales Analytics & Reporting',
      'Multi-location & Multi-currency Support',
      'Customer Loyalty Programs',
      'Offline Mode Capability',
      'Hardware Integration (Printers, Scanners, Cash Drawers)'
    ],
    details: 'Our advanced POS systems are designed to streamline your business operations, reduce human error, and provide valuable business insights. Whether you run a retail store, restaurant, or service business, our solutions are tailored to meet your specific needs with robust features and reliable performance.',
    icon: '💳',
    image: '/src/assets/services/pos-systems-bg.webp',
    websiteTypes: [
      {
        name: 'Retail POS',
        description: 'Complete point of sale for retail stores with inventory and customer management'
      },
      {
        name: 'Restaurant POS',
        description: 'Specialized for food service with table management and kitchen display systems'
      },
      {
        name: 'Service Business POS',
        description: 'For salons, spas, and appointment-based businesses'
      },
      {
        name: 'Multi-location Enterprise',
        description: 'Centralized management for businesses with multiple outlets'
      }
    ],
    techStack: {
      frontend: ['React', 'TypeScript', 'Redux', 'Material-UI'],
      backend: ['Node.js', 'Express', 'Python', 'Django'],
      databases: ['PostgreSQL', 'MongoDB', 'Redis'],
      ecommerce: ['Stripe', 'M-Pesa', 'PayPal'],
      devops: ['Docker', 'AWS', 'CI/CD Pipelines']
    },
    process: [
      'Business requirements analysis',
      'Custom solution design',
      'Hardware recommendation and setup',
      'Software development and integration',
      'Staff training and onboarding',
      'Ongoing support and maintenance'
    ],
    benefits: [
      '30% average increase in operational efficiency',
      'Real-time inventory tracking and alerts',
      'Comprehensive sales analytics dashboard',
      'Secure payment processing',
      '24/7 technical support',
      'Regular feature updates and improvements'
    ]
  },
  {
    id: 'saas-solutions',
    slug: 'saas-solutions',
    title: 'SaaS Solutions',
    description: 'Custom Software as a Service applications for businesses of all sizes',
    price: 'Starting at KSh 250,000',
    features: [
      'Multi-tenant Architecture',
      'Role-based Access Control',
      'Automated Billing & Subscriptions',
      'RESTful API Integration',
      'Real-time Analytics Dashboard',
      'White-label Solutions'
    ],
    details: 'Our custom SaaS solutions empower businesses to deliver software applications over the internet with maximum efficiency and minimal maintenance. We build secure, scalable, and high-performance applications that can be accessed from anywhere, on any device, with enterprise-grade security and reliability.',
    icon: '☁️',
    image: '/src/assets/services/saas-bg.webp',
    websiteTypes: [
      {
        name: 'Business Process Automation',
        description: 'Streamline complex business workflows with custom automation'
      },
      {
        name: 'Enterprise Resource Planning',
        description: 'Integrated management of core business processes'
      },
      {
        name: 'Customer Relationship Management',
        description: 'Manage customer interactions and data throughout the customer lifecycle'
      },
      {
        name: 'Custom Business Applications',
        description: 'Tailored solutions for unique business challenges'
      }
    ],
    techStack: {
      frontend: ['React', 'Vue.js', 'TypeScript', 'GraphQL'],
      backend: ['Node.js', 'NestJS', 'Python', 'Django'],
      databases: ['PostgreSQL', 'MongoDB', 'Amazon RDS'],
      cloud: ['AWS', 'Google Cloud', 'Microsoft Azure'],
      devops: ['Kubernetes', 'Docker', 'Terraform', 'CI/CD']
    },
    process: [
      'Discovery and requirements gathering',
      'Architecture and system design',
      'Agile development sprints',
      'Quality assurance and testing',
      'Deployment and launch',
      'Performance monitoring and optimization'
    ],
    benefits: [
      'Reduced IT costs with cloud infrastructure',
      'Automatic updates and maintenance',
      'Scalable to handle business growth',
      'Secure data storage and backup',
      'Cross-platform accessibility',
      'Detailed usage analytics and reporting'
    ]
  },
  {
    id: 'ai-automation',
    slug: 'ai-automation',
    title: 'AI & Automation',
    description: 'Transform your business with cutting-edge artificial intelligence and automation solutions',
    price: 'KSh 40,000 - 350,000',
    features: [
      'Custom Machine Learning Models',
      'Process Automation & RPA',
      'Predictive Analytics & Forecasting',
      'Natural Language Processing (NLP)',
      'Computer Vision Solutions',
      'AI-powered Chatbots & Virtual Assistants'
    ],
    details: 'Our AI and automation solutions help businesses harness the power of artificial intelligence to drive efficiency, reduce costs, and unlock new opportunities. From automating routine tasks to building sophisticated machine learning models, we deliver intelligent solutions that transform how you work.',
    icon: '🤖',
    image: '/src/assets/services/ai-automation-bg.webp',
    websiteTypes: [
      {
        name: 'Intelligent Process Automation',
        description: 'Automate complex business processes with AI-driven workflows'
      },
      {
        name: 'Predictive Analytics',
        description: 'Leverage historical data to forecast trends and behaviors'
      },
      {
        name: 'Conversational AI',
        description: 'Build intelligent chatbots and virtual assistants'
      },
      {
        name: 'Computer Vision',
        description: 'Image and video analysis for various business applications'
      }
    ],
    techStack: {
      ml: ['TensorFlow', 'PyTorch', 'scikit-learn', 'Keras'],
      nlp: ['spaCy', 'NLTK', 'Hugging Face', 'OpenAI'],
      vision: ['OpenCV', 'YOLO', 'TensorFlow Object Detection'],
      automation: ['Python', 'RPA Framework', 'Selenium', 'Zapier'],
      cloud: ['Google AI', 'AWS AI Services', 'Azure Cognitive Services']
    },
    process: [
      'Business needs assessment and data evaluation',
      'Proof of concept development',
      'Data collection and preparation',
      'Model training and validation',
      'Integration with existing systems',
      'Deployment and continuous improvement'
    ],
    benefits: [
      'Up to 70% reduction in manual processing time',
      'Data-driven decision making',
      '24/7 automated operations',
      'Reduced human error',
      'Scalable AI solutions',
      'Ongoing support and model retraining'
    ]
  }
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find(service => service.slug === slug);
};
