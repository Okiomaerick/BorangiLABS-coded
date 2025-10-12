import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCode, FaRocket, FaLightbulb, FaTools, FaShieldAlt, FaChartLine, FaQuestionCircle, FaBookOpen } from 'react-icons/fa';
import './KnowledgeBaseCategory.css';

interface CategoryDetail {
  id: string;
  title: string;
  description: string;
  content: {
    overview: string;
    keyFeatures: string[];
    benefits: string[];
    useCases: string[];
    technologies?: string[];
    bestPractices?: string[];
    commonChallenges?: string[];
    implementationTips?: string[];
    performanceConsiderations?: string[];
    securityAspects?: string[];
    toolsAndResources?: string[];
    caseStudies?: Array<{
      title: string;
      description: string;
      outcome: string;
    }>;
    faqs?: Array<{
      question: string;
      answer: string;
    }>;
  };
  relatedArticles: {
    id: number;
    title: string;
    slug: string;
  }[];
}

const categoryDetails: Record<string, CategoryDetail> = {
  'web-dev': {
    id: 'web-dev',
    title: 'Web Development',
    description: 'Comprehensive resources for modern web development',
    content: {
      overview: 'Web development involves building and maintaining websites and web applications. Our web development services focus on creating responsive, high-performance, and user-friendly web experiences using the latest technologies and best practices. We follow industry standards and modern development workflows to deliver robust and scalable web solutions.',
      keyFeatures: [
        'Responsive design for all devices (mobile-first approach)',
        'Progressive Web App (PWA) capabilities with offline support',
        'SEO optimization and semantic HTML5',
        'Performance optimization (Core Web Vitals, lazy loading, code splitting)',
        'Cross-browser compatibility and accessibility (WCAG 2.1 AA compliance)'
      ],
      benefits: [
        'Enhanced user experience with smooth animations and transitions',
        'Improved search engine visibility through technical SEO',
        'Faster page load times with optimized assets and caching',
        'Better conversion rates with optimized user flows',
        'Scalable architecture with micro-frontends when needed'
      ],
      useCases: [
        'Corporate websites with CMS integration',
        'E-commerce platforms with payment gateways',
        'Single Page Applications (SPAs) with client-side routing',
        'Progressive Web Apps with offline capabilities',
        'Content management systems with custom plugins',
        'Dashboards and data visualization tools',
        'Real-time collaborative applications'
      ],
      technologies: [
        'Frontend: React.js, Next.js, TypeScript, Redux, Tailwind CSS',
        'Backend: Node.js, Express, NestJS, Python, Django',
        'Databases: MongoDB, PostgreSQL, Firebase',
        'APIs: REST, GraphQL, WebSockets',
        'DevOps: Docker, Kubernetes, GitHub Actions',
        'Testing: Jest, Cypress, React Testing Library'
      ],
      bestPractices: [
        'Component-based architecture with reusable UI components',
        'State management strategy based on application needs',
        'Progressive enhancement and graceful degradation',
        'Code splitting and lazy loading for better performance',
        'Comprehensive error handling and logging',
        'Accessibility (a11y) compliance from the start',
        'Security-first approach (XSS, CSRF protection)'
      ],
      commonChallenges: [
        'Browser compatibility issues',
        'Performance bottlenecks on low-end devices',
        'State management complexity in large applications',
        'SEO optimization for SPAs',
        'Cross-origin resource sharing (CORS) issues',
        'Handling large datasets efficiently',
        'Third-party integration complexities'
      ],
      implementationTips: [
        'Start with a solid project structure and naming conventions',
        'Implement proper error boundaries in React applications',
        'Use environment variables for configuration',
        'Set up proper build and bundling configurations',
        'Implement comprehensive logging and monitoring',
        'Use feature flags for gradual rollouts',
        'Document all components and APIs thoroughly'
      ],
      performanceConsiderations: [
        'Optimize images and media assets',
        'Implement code splitting and lazy loading',
        'Use CDN for static assets',
        'Optimize critical rendering path',
        'Implement proper caching strategies',
        'Minimize main thread work',
        'Use web workers for CPU-intensive tasks'
      ],
      securityAspects: [
        'Implement Content Security Policy (CSP)',
        'Use HTTP security headers',
        'Protect against XSS and CSRF attacks',
        'Implement proper authentication and authorization',
        'Regular dependency updates',
        'Input validation and sanitization',
        'Secure API endpoints'
      ],
      toolsAndResources: [
        'Code editors: VS Code, WebStorm',
        'Version control: Git, GitHub/GitLab',
        'Package managers: npm, Yarn, pnpm',
        'Build tools: Webpack, Vite, esbuild',
        'Testing: Jest, Cypress, Playwright',
        'Performance: Lighthouse, WebPageTest',
        'Monitoring: Sentry, LogRocket, New Relic'
      ],
      caseStudies: [
        {
          title: 'E-commerce Platform Migration',
          description: 'Migrated legacy PHP e-commerce platform to modern React/Node.js stack',
          outcome: 'Improved page load time by 65%, increased conversion rate by 30%'
        },
        {
          title: 'Progressive Web App Implementation',
          description: 'Converted existing web application to PWA with offline capabilities',
          outcome: 'Increased user engagement by 40%, reduced bounce rate by 25%'
        }
      ],
      faqs: [
        {
          question: 'What is the difference between SSR and CSR?',
          answer: 'Server-Side Rendering (SSR) renders pages on the server, while Client-Side Rendering (CSR) renders in the browser. SSR is better for SEO and initial load, while CSR provides smoother navigation after initial load.'
        },
        {
          question: 'How do you handle state management in large applications?',
          answer: 'We use a combination of React Context for global state, React Query for server state, and local component state for UI-specific state. For complex applications, we might introduce Redux or Zustand.'
        },
        {
          question: 'What is your approach to testing?',
          answer: 'We follow a testing pyramid approach with unit tests (Jest), integration tests (React Testing Library), and E2E tests (Cypress). We aim for 80%+ test coverage on critical paths.'
        }
      ]
    },
    relatedArticles: [
      { id: 1, title: 'Getting Started with React and TypeScript', slug: 'getting-started-with-react-typescript' },
      { id: 2, title: 'Building Scalable APIs with Express', slug: 'building-scalable-apis-express' },
      { id: 3, title: 'Modern CSS Techniques', slug: 'modern-css-techniques' },
      { id: 22, title: 'Advanced React Performance Optimization', slug: 'react-performance-optimization' },
      { id: 23, title: 'State Management in 2024', slug: 'state-management-2024' },
      { id: 24, title: 'Web Vitals and Core Web Vitals Explained', slug: 'core-web-vitals-guide' }
    ]
  },
  'mobile': {
    id: 'mobile',
    title: 'Mobile Development',
    description: 'Cross-platform and native mobile app development for iOS and Android platforms',
    content: {
      overview: 'Mobile development focuses on creating applications for mobile devices. We specialize in both native and cross-platform development to deliver high-quality mobile experiences. Our approach combines the performance of native development with the efficiency of cross-platform solutions to create apps that look and feel great on any device.',
      keyFeatures: [
        'Cross-platform development with React Native and Flutter',
        'Native performance with platform-specific optimizations',
        'Offline-first architecture with data synchronization',
        'Push notifications and in-app messaging',
        'Deep device hardware integration (camera, GPS, sensors)'
      ],
      benefits: [
        'Reach both iOS and Android users with a single codebase',
        'Native-like performance with optimized rendering',
        'Faster development cycles and reduced time to market',
        'Consistent user experience across platforms',
        'Easier maintenance and updates',
        'Access to native APIs and device features',
        'Strong community and ecosystem support'
      ],
      useCases: [
        'Business and productivity applications',
        'E-commerce and retail apps',
        'Social networking platforms',
        'Health and fitness trackers',
        'On-demand service applications',
        'Media streaming services',
        'Enterprise mobility solutions'
      ],
      technologies: [
        'Cross-platform: React Native, Flutter, Xamarin',
        'iOS: Swift, SwiftUI, Objective-C',
        'Android: Kotlin, Java, Jetpack Compose',
        'Backend: Node.js, Firebase, GraphQL',
        'State Management: Redux, MobX, Provider',
        'Testing: Jest, Detox, Appium',
        'CI/CD: Fastlane, Bitrise, GitHub Actions'
      ],
      bestPractices: [
        'Follow platform-specific design guidelines (Material Design, Human Interface)',
        'Implement responsive layouts for various screen sizes',
        'Optimize app startup time and memory usage',
        'Implement proper error handling and crash reporting',
        'Use adaptive icons and splash screens',
        'Implement proper navigation patterns',
        'Follow security best practices for data storage'
      ],
      commonChallenges: [
        'Handling different screen sizes and aspect ratios',
        'Managing app state across platforms',
        'Dealing with platform-specific limitations',
        'Optimizing app size and performance',
        'Managing app lifecycle and background tasks',
        'Handling different Android versions and iOS updates',
        'Ensuring consistent UI/UX across platforms'
      ],
      implementationTips: [
        'Start with a solid project structure and architecture',
        'Use TypeScript for better type safety',
        'Implement proper error boundaries and fallback UIs',
        'Optimize images and assets for mobile',
        'Use vector icons instead of bitmap when possible',
        'Implement proper analytics and monitoring',
        'Set up automated testing and deployment pipelines'
      ],
      performanceConsiderations: [
        'Optimize app startup time',
        'Minimize memory usage and leaks',
        'Implement efficient data fetching and caching',
        'Optimize animations and transitions',
        'Reduce APK/IPA size',
        'Implement background data sync',
        'Monitor and optimize battery usage'
      ],
      securityAspects: [
        'Secure data storage with encryption',
        'Implement secure authentication',
        'Use certificate pinning',
        'Protect against reverse engineering',
        'Secure network communications with TLS',
        'Implement proper session management',
        'Regular security audits and updates'
      ],
      toolsAndResources: [
        'IDEs: Android Studio, Xcode, VS Code',
        'Design: Figma, Sketch, Adobe XD',
        'Version Control: Git, GitHub, Bitbucket',
        'Testing: Firebase Test Lab, BrowserStack',
        'Analytics: Firebase Analytics, Mixpanel',
        'Monitoring: Crashlytics, Sentry',
        'CI/CD: Bitrise, Codemagic, GitHub Actions'
      ],
      caseStudies: [
        {
          title: 'Cross-Platform E-commerce App',
          description: 'Developed a React Native e-commerce app with offline capabilities',
          outcome: 'Reduced development time by 40% compared to native, 4.8/5 App Store rating'
        },
        {
          title: 'Health Tracking Application',
          description: 'Built a health tracking app with native modules for sensor integration',
          outcome: 'Achieved 95% code sharing between platforms, 1M+ downloads'
        }
      ],
      faqs: [
        {
          question: 'What are the advantages of React Native over native development?',
          answer: 'React Native offers faster development cycles, code reuse between platforms, and a large ecosystem. However, for apps requiring intensive graphics or platform-specific features, native development might be more suitable.'
        },
        {
          question: 'How do you handle platform-specific code?',
          answer: 'We use platform-specific file extensions (.ios.js, .android.js) and the Platform API in React Native. For more complex cases, we create native modules that bridge to platform-specific code.'
        },
        {
          question: 'What is your approach to app performance optimization?',
          answer: 'We focus on optimizing app startup time, reducing memory usage, and improving rendering performance. We use tools like React Native Performance and Xcode Instruments to identify and fix performance bottlenecks.'
        }
      ]
    },
    relatedArticles: [
      { id: 4, title: 'Building Cross-Platform Apps with React Native', slug: 'react-native-cross-platform' },
      { id: 5, title: 'Mobile App Performance Optimization', slug: 'mobile-app-performance' },
      { id: 25, title: 'State Management in React Native', slug: 'react-native-state-management' },
      { id: 26, title: 'Building Offline-First Mobile Apps', slug: 'offline-first-mobile-apps' },
      { id: 27, title: 'Mobile App Security Best Practices', slug: 'mobile-app-security' },
      { id: 28, title: 'App Store Optimization (ASO) Guide', slug: 'app-store-optimization' }
    ]
  },
  'devops': {
    id: 'devops',
    title: 'DevOps & Cloud',
    description: 'Streamlined development, deployment, and infrastructure management',
    content: {
      overview: 'DevOps practices and cloud solutions to enhance your development workflow, deployment speed, and system reliability. We implement modern DevOps methodologies to bridge the gap between development and operations, enabling continuous delivery and high-velocity software development.',
      keyFeatures: [
        'End-to-end CI/CD pipeline automation',
        'Infrastructure as Code (IaC) with Terraform and Pulumi',
        'Container orchestration with Kubernetes and Docker Swarm',
        'Comprehensive monitoring and observability stack',
        'GitOps workflow implementation',
        'Security and compliance automation',
        'Multi-cloud and hybrid cloud strategies'
      ],
      benefits: [
        'Accelerated software delivery and time to market',
        'Improved collaboration between development and operations teams',
        'Higher deployment frequency with reduced failure rates',
        'Enhanced system reliability and availability',
        'Optimized resource utilization and cost management',
        'Better security and compliance posture',
        'Improved mean time to recovery (MTTR)'
      ],
      useCases: [
        'Microservices architecture implementation',
        'Legacy system modernization and cloud migration',
        'Automated testing and deployment pipelines',
        'Infrastructure automation and management',
        'Performance monitoring and optimization',
        'Disaster recovery and business continuity',
        'Serverless architecture implementation'
      ],
      technologies: [
        'Containerization: Docker, containerd, Podman',
        'Orchestration: Kubernetes, Docker Swarm, Amazon ECS',
        'Cloud Providers: AWS, Azure, Google Cloud, DigitalOcean',
        'IaC: Terraform, Pulumi, AWS CDK',
        'CI/CD: GitHub Actions, GitLab CI, Jenkins, ArgoCD',
        'Monitoring: Prometheus, Grafana, ELK Stack, New Relic',
        'Security: Vault, Aqua Security, Twistlock'
      ],
      bestPractices: [
        'Implement infrastructure as code for all environments',
        'Use immutable infrastructure patterns',
        'Implement comprehensive logging and monitoring',
        'Automate security scanning in the CI/CD pipeline',
        'Practice blue/green or canary deployments',
        'Implement proper secret management',
        'Regularly update and patch all dependencies'
      ],
      commonChallenges: [
        'Managing complex microservices architectures',
        'Ensuring consistent environments across teams',
        'Handling stateful applications in containers',
        'Managing configuration drift',
        'Balancing security with developer productivity',
        'Cost management in cloud environments',
        'Skills gap and team adoption'
      ],
      implementationTips: [
        'Start with a proof of concept before full-scale implementation',
        'Implement monitoring and logging from day one',
        'Use policy as code for governance',
        'Implement proper tagging and resource organization',
        'Establish clear incident response procedures',
        'Document all infrastructure and processes',
        'Regularly review and optimize cloud costs'
      ],
      performanceConsiderations: [
        'Optimize container images for size and security',
        'Implement proper resource requests and limits',
        'Use node auto-scaling effectively',
        'Optimize network performance',
        'Implement caching strategies',
        'Monitor and optimize database performance',
        'Regularly review and optimize CI/CD pipeline performance'
      ],
      securityAspects: [
        'Implement least privilege access control',
        'Scan containers for vulnerabilities',
        'Encrypt data in transit and at rest',
        'Implement network policies and segmentation',
        'Regular security audits and penetration testing',
        'Implement automated security testing',
        'Maintain an up-to-date incident response plan'
      ],
      toolsAndResources: [
        'Version Control: GitHub, GitLab, Bitbucket',
        'Container Registry: Docker Hub, Amazon ECR, Google Container Registry',
        'Secrets Management: HashiCorp Vault, AWS Secrets Manager',
        'Configuration Management: Ansible, Chef, Puppet',
        'Service Mesh: Istio, Linkerd, Consul',
        'API Gateway: Kong, Apigee, AWS API Gateway',
        'Documentation: Confluence, Notion, Read the Docs'
      ],
      caseStudies: [
        {
          title: 'Kubernetes at Scale',
          description: 'Migrated monolithic application to microservices on Kubernetes',
          outcome: 'Reduced deployment time from hours to minutes, 99.99% uptime achieved'
        },
        {
          title: 'Multi-Cloud Strategy Implementation',
          description: 'Implemented a hybrid cloud solution across AWS and Azure',
          outcome: 'Achieved 40% cost reduction while improving reliability'
        }
      ],
      faqs: [
        {
          question: 'What is the difference between DevOps and SRE?',
          answer: 'DevOps focuses on cultural philosophies, practices, and tools that increase an organization\'s ability to deliver applications and services at high velocity. Site Reliability Engineering (SRE) is a specific implementation of DevOps principles with a stronger focus on reliability, scalability, and automation.'
        },
        {
          question: 'How do you handle database migrations in a CI/CD pipeline?',
          answer: 'We implement database migrations as part of the deployment process using tools like Flyway or Liquibase. Migrations are version-controlled, tested in lower environments, and applied automatically during deployments with proper rollback procedures in place.'
        },
        {
          question: 'What is your approach to cloud cost optimization?',
          answer: 'We implement cost optimization through right-sizing resources, implementing auto-scaling, using reserved/savings plans, cleaning up unused resources, implementing cost allocation tags, and regularly reviewing cost reports. We also use tools like AWS Cost Explorer or Google Cloud\'s cost management tools.'
        }
      ]
    },
    relatedArticles: [
      { id: 6, title: 'Getting Started with Kubernetes', slug: 'kubernetes-getting-started' },
      { id: 7, title: 'CI/CD Best Practices', slug: 'cicd-best-practices' },
      { id: 29, title: 'Terraform Modules for Infrastructure as Code', slug: 'terraform-modules' },
      { id: 30, title: 'Monitoring Microservices at Scale', slug: 'monitoring-microservices' },
      { id: 31, title: 'GitOps: The Future of DevOps?', slug: 'gitops-future-devops' },
      { id: 32, title: 'Cloud Cost Optimization Strategies', slug: 'cloud-cost-optimization' },
      { id: 33, title: 'Kubernetes Security Best Practices', slug: 'kubernetes-security' }
    ]
  },
  'database': {
    id: 'database',
    title: 'Database Solutions',
    description: 'Comprehensive data storage, management, and analytics solutions',
    content: {
      overview: 'Expert database solutions for storing, managing, and analyzing your application data with optimal performance, reliability, and scalability. We design and implement database architectures that meet your specific requirements, whether you need relational, NoSQL, or specialized database technologies.',
      keyFeatures: [
        'Relational, NoSQL, and NewSQL database solutions',
        'Data modeling and schema design',
        'Query optimization and performance tuning',
        'High availability and disaster recovery',
        'Data migration and ETL processes',
        'Data security and compliance',
        'Real-time analytics and reporting'
      ],
      benefits: [
        'Data integrity and consistency',
        'High performance and low latency',
        'Horizontal and vertical scalability',
        'Robust security and access control',
        'Actionable business intelligence',
        'Reduced operational overhead',
        'Future-proof architecture'
      ],
      useCases: [
        'High-volume transactional systems',
        'Real-time analytics and business intelligence',
        'Content management and delivery',
        'User identity and access management',
        'Logging, monitoring, and observability',
        'Time-series data and IoT applications',
        'Graph-based relationship mapping'
      ],
      technologies: [
        'Relational: PostgreSQL, MySQL, Oracle, SQL Server',
        'Document: MongoDB, Couchbase, Firebase',
        'Key-Value: Redis, DynamoDB, etcd',
        'Search: Elasticsearch, OpenSearch, Solr',
        'Time-Series: InfluxDB, TimescaleDB',
        'Graph: Neo4j, Amazon Neptune, ArangoDB',
        'Wide-Column: Cassandra, ScyllaDB, Bigtable'
      ],
      bestPractices: [
        'Proper indexing strategy based on query patterns',
        'Normalization vs. denormalization based on use case',
        'Implement connection pooling and connection management',
        'Regular database maintenance and optimization',
        'Comprehensive backup and recovery procedures',
        'Data partitioning and sharding strategies',
        'Implement database monitoring and alerting'
      ],
      commonChallenges: [
        'Database performance bottlenecks',
        'Handling database migrations',
        'Managing database schema changes',
        'Scaling read and write operations',
        'Ensuring data consistency in distributed systems',
        'Database security vulnerabilities',
        'Backup and recovery planning'
      ],
      implementationTips: [
        'Choose the right database technology for your specific use case',
        'Implement proper database connection handling',
        'Use database connection pooling effectively',
        'Implement caching strategies where appropriate',
        'Plan for database growth and scaling',
        'Document your database schema and relationships',
        'Implement comprehensive monitoring and alerting'
      ],
      performanceConsiderations: [
        'Query optimization and execution plans',
        'Indexing strategies and optimization',
        'Connection pooling and resource management',
        'Caching strategies and implementation',
        'Partitioning and sharding approaches',
        'Read replicas for read-heavy workloads',
        'Connection pooling and statement caching'
      ],
      securityAspects: [
        'Data encryption at rest and in transit',
        'Role-based access control (RBAC)',
        'Database activity monitoring',
        'SQL injection prevention',
        'Sensitive data protection',
        'Audit logging and compliance',
        'Regular security patching and updates'
      ],
      toolsAndResources: [
        'Database Management: DBeaver, TablePlus, pgAdmin, MongoDB Compass',
        'Migration: Flyway, Liquibase, db-migrate',
        'Monitoring: Datadog, New Relic, PMM',
        'Backup: pg_dump, mongodump, AWS Backup',
        'Performance: pgBadger, Percona Toolkit, MongoDB Ops Manager',
        'Modeling: dbdiagram.io, Lucidchart, dbdesigner',
        'ETL: Apache Airflow, Talend, Informatica'
      ],
      caseStudies: [
        {
          title: 'High-Traffic E-commerce Platform',
          description: 'Designed and implemented a sharded PostgreSQL cluster for a high-traffic e-commerce platform',
          outcome: 'Achieved 99.99% uptime, handled 10,000+ transactions per second'
        },
        {
          title: 'Real-time Analytics Dashboard',
          description: 'Implemented a time-series database solution for real-time analytics',
          outcome: 'Reduced query response time from minutes to milliseconds'
        },
        {
          title: 'Legacy Database Migration',
          description: 'Migrated from legacy Oracle database to modern PostgreSQL',
          outcome: 'Reduced licensing costs by 70% while improving performance'
        }
      ],
      faqs: [
        {
          question: 'How do you choose between SQL and NoSQL databases?',
          answer: 'SQL databases are ideal for structured data with complex queries and transactions requiring ACID compliance. NoSQL databases excel in handling unstructured/semi-structured data, horizontal scaling, and flexible schema requirements. The choice depends on your specific use case, data model, and scalability needs.'
        },
        {
          question: 'What strategies do you use for database scaling?',
          answer: 'We employ various scaling strategies including vertical scaling (increasing server resources), read replicas (for read-heavy workloads), sharding (partitioning data across multiple servers), and implementing caching layers. The approach depends on your specific workload patterns and growth projections.'
        },
        {
          question: 'How do you ensure database security?',
          answer: 'We implement multiple layers of security including encryption at rest and in transit, role-based access control, regular security audits, SQL injection prevention, network security groups, and database activity monitoring. We also ensure compliance with relevant regulations (GDPR, HIPAA, etc.) based on your industry requirements.'
        },
        {
          question: 'What is your approach to database migrations?',
          answer: 'We use version-controlled database migrations with tools like Flyway or Liquibase. Our migration strategy includes thorough testing in staging environments, rollback procedures, and zero-downtime deployments where possible. We also implement backward compatibility to ensure smooth transitions.'
        }
      ]
    },
    relatedArticles: [
      { id: 8, title: 'Choosing the Right Database', slug: 'choosing-database' },
      { id: 9, title: 'Database Performance Tuning', slug: 'database-performance-tuning' },
      { id: 34, title: 'PostgreSQL vs MySQL: A Detailed Comparison', slug: 'postgresql-vs-mysql' },
      { id: 35, title: 'MongoDB Schema Design Best Practices', slug: 'mongodb-schema-design' },
      { id: 36, title: 'Database Sharding Strategies', slug: 'database-sharding' },
      { id: 37, title: 'Implementing Database Caching with Redis', slug: 'redis-caching' },
      { id: 38, title: 'Time-Series Data: Storage and Analysis', slug: 'timeseries-databases' }
    ]
  },
  'security': {
    id: 'security',
    title: 'Security',
    description: 'Protecting your applications and data',
    content: {
      overview: 'Comprehensive security solutions to protect your applications, data, and infrastructure from threats and vulnerabilities.',
      keyFeatures: [
        'Application security',
        'Data encryption',
        'Authentication & Authorization',
        'Vulnerability assessment',
        'Compliance & Auditing'
      ],
      benefits: [
        'Protection against threats',
        'Regulatory compliance',
        'Customer trust',
        'Reduced risk of data breaches',
        'Secure payment processing'
      ],
      useCases: [
        'Secure authentication systems',
        'Payment processing',
        'Data protection',
        'API security',
        'Compliance management'
      ],
      technologies: [
        'OAuth', 'JWT', 'SSL/TLS', 'OpenID Connect',
        'OWASP', 'Penetration Testing', 'SIEM', 'WAF'
      ],
      bestPractices: [
        'Regular security audits',
        'Principle of least privilege',
        'Secure coding practices',
        'Incident response planning',
        'Security awareness training'
      ],
      commonChallenges: [
        'Keeping up with evolving threats',
        'Balancing security and usability',
        'Managing third-party risks',
        'Compliance with regulations',
        'Security in CI/CD pipelines'
      ],
      implementationTips: [
        'Use security headers (CSP, HSTS, etc.)',
        'Implement rate limiting',
        'Regular dependency updates',
        'Security testing automation',
        'Monitor security advisories'
      ],
      performanceConsiderations: [
        'Impact of encryption on performance',
        'Security vs. performance trade-offs',
        'Caching security headers',
        'Load balancer security features',
        'CDN security capabilities'
      ],
      securityAspects: [
        'Data protection at rest and in transit',
        'Identity and access management',
        'Network security',
        'Application security controls',
        'Security monitoring and logging'
      ],
      toolsAndResources: [
        'OWASP ZAP',
        'Burp Suite',
        'Nessus',
        'Metasploit',
        'Security Headers'
      ],
      caseStudies: [
        {
          title: 'E-commerce Platform Security Overhaul',
          description: 'Implemented comprehensive security measures for a high-traffic e-commerce platform',
          outcome: 'Reduced security incidents by 90% and achieved PCI DSS compliance'
        },
        {
          title: 'Healthcare Data Protection',
          description: 'Secured sensitive healthcare data for a telemedicine application',
          outcome: 'Achieved HIPAA compliance and gained patient trust'
        }
      ],
      faqs: [
        {
          question: 'How do you handle security in cloud environments?',
          answer: 'We implement a shared responsibility model, securing our applications while leveraging cloud provider security features. This includes network security groups, identity and access management, encryption, and regular security assessments.'
        },
        {
          question: 'What security certifications do you have?',
          answer: 'Our team holds various security certifications including CISSP, CEH, and OSCP. We follow industry best practices and frameworks such as OWASP, NIST, and ISO 27001.'
        }
      ]
    },
    relatedArticles: [
      { id: 10, title: 'Implementing JWT Authentication', slug: 'jwt-authentication' },
      { id: 11, title: 'OWASP Top 10 Security Risks', slug: 'owasp-top-10' },
      { id: 12, title: 'Secure API Development Best Practices', slug: 'secure-api-development' },
      { id: 13, title: 'Data Encryption Methods Explained', slug: 'data-encryption-methods' },
      { id: 14, title: 'Compliance Standards for Web Applications', slug: 'compliance-standards' },
      { id: 34, title: 'Why Your Wi-Fi is Slow (and How to Fix It in Kenya)', slug: 'slow-wifi-kenya' }
    ]
  },
  'cloud': {
    id: 'cloud',
    title: 'Cloud Services',
    description: 'Scalable cloud infrastructure and services',
    content: {
      overview: 'Leverage the power of cloud computing with our comprehensive cloud services, including infrastructure, platform, and software solutions.',
      keyFeatures: [
        'Cloud migration',
        'Serverless architecture',
        'Managed services',
        'Hybrid cloud solutions',
        'Cloud security'
      ],
      benefits: [
        'Reduced infrastructure costs',
        'Global scalability',
        'High availability',
        'Disaster recovery',
        'Automatic updates'
      ],
      useCases: [
        'Web application hosting',
        'Big data processing',
        'AI/ML workloads',
        'Content delivery',
        'Backup and recovery'
      ],
      technologies: [
        'AWS', 'Azure', 'Google Cloud', 'Firebase',
        'Serverless', 'Lambda', 'Kubernetes', 'Docker'
      ]
    },
    relatedArticles: [
      { id: 12, title: 'Getting Started with AWS', slug: 'aws-getting-started' },
      { id: 13, title: 'Serverless Architecture Patterns', slug: 'serverless-patterns' }
    ]
  },
  'payments': {
    id: 'payments',
    title: 'Payment Integration',
    description: 'Secure and reliable payment processing',
    content: {
      overview: 'Seamless payment integration solutions for businesses of all sizes, supporting multiple payment methods and currencies.',
      keyFeatures: [
        'Multiple payment gateways',
        'Recurring billing',
        'PCI compliance',
        'Fraud detection',
        'Global payment methods'
      ],
      benefits: [
        'Increased conversion rates',
        'Secure transactions',
        'Global reach',
        'Automated reconciliation',
        'Detailed reporting'
      ],
      useCases: [
        'E-commerce platforms',
        'Subscription services',
        'Marketplaces',
        'Donation systems',
        'SaaS applications'
      ],
      technologies: [
        'Stripe', 'PayPal', 'M-Pesa', 'Square',
        'Braintree', 'Razorpay', '2Checkout', 'Authorize.net'
      ]
    },
    relatedArticles: [
      { id: 14, title: 'Integrating M-Pesa in Your Application', slug: 'mpesa-integration' },
      { id: 15, title: 'Handling Failed Payments', slug: 'handling-failed-payments' },
      { id: 35, title: 'The Complete Guide to M-Pesa Integration for Businesses in Kenya (2025)', slug: 'mpesa-integration-guide-2025' }
    ]
  },
  'ecommerce': {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Powerful online selling solutions',
    content: {
      overview: 'Complete e-commerce solutions that help businesses sell products and services online with ease and efficiency.',
      keyFeatures: [
        'Product catalog management',
        'Shopping cart functionality',
        'Secure checkout',
        'Inventory management',
        'Order processing'
      ],
      benefits: [
        '24/7 online presence',
        'Global customer reach',
        'Reduced operational costs',
        'Data-driven insights',
        'Automated processes'
      ],
      useCases: [
        'Online retail stores',
        'Digital product sales',
        'Dropshipping',
        'Subscription services',
        'B2B marketplaces'
      ],
      technologies: [
        'Shopify', 'WooCommerce', 'Magento', 'BigCommerce',
        'Stripe', 'PayPal', 'Square', 'Razorpay'
      ]
    },
    relatedArticles: [
      { id: 16, title: 'Optimizing E-commerce Conversion Rates', slug: 'ecommerce-conversion' },
      { id: 17, title: 'Mobile Commerce Best Practices', slug: 'mobile-commerce' },
      { id: 36, title: 'How POS Systems Are Transforming Small Shops in Kenya', slug: 'pos-systems-kenya' }
    ]
  },
  'analytics': {
    id: 'analytics',
    title: 'Analytics',
    description: 'Data-driven insights for business growth',
    content: {
      overview: 'Advanced analytics solutions to help businesses understand their data, track performance, and make informed decisions.',
      keyFeatures: [
        'Custom dashboards',
        'Real-time reporting',
        'User behavior analysis',
        'Conversion tracking',
        'Predictive analytics'
      ],
      benefits: [
        'Data-driven decisions',
        'Improved ROI',
        'Better customer insights',
        'Competitive advantage',
        'Performance optimization'
      ],
      useCases: [
        'Website analytics',
        'User behavior tracking',
        'Marketing campaign analysis',
        'Sales performance',
        'Customer segmentation'
      ],
      technologies: [
        'Google Analytics', 'Mixpanel', 'Amplitude', 'Tableau',
        'Power BI', 'Looker', 'Segment', 'Hotjar'
      ]
    },
    relatedArticles: [
      { id: 18, title: 'Getting Started with Google Analytics', slug: 'google-analytics-basics' },
      { id: 19, title: 'Measuring User Engagement', slug: 'measuring-user-engagement' }
    ]
  },
  'api': {
    id: 'api',
    title: 'API Development',
    description: 'Robust and scalable API solutions',
    content: {
      overview: 'Design, develop, and deploy high-performance APIs that power modern applications and services.',
      keyFeatures: [
        'RESTful API design',
        'GraphQL implementation',
        'Authentication & Authorization',
        'Rate limiting',
        'API documentation'
      ],
      benefits: [
        'Improved system integration',
        'Better scalability',
        'Faster development cycles',
        'Enhanced security',
        'Better developer experience'
      ],
      useCases: [
        'Microservices architecture',
        'Third-party integrations',
        'Mobile backends',
        'Public API platforms',
        'Internal tooling'
      ],
      technologies: [
        'Node.js', 'Express', 'NestJS', 'GraphQL',
        'Swagger', 'Postman', 'Apollo', 'Kong'
      ]
    },
    relatedArticles: [
      { id: 20, title: 'REST vs GraphQL: Choosing the Right API', slug: 'rest-vs-graphql' },
      { id: 21, title: 'API Security Best Practices', slug: 'api-security-best-practices' }
    ]
  }
};

const KnowledgeBaseCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const category = categoryDetails[categoryId || ''];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="container">
        <div className="not-found">
          <h2>Category not found</h2>
          <Link to="/knowledge-base" className="btn btn-primary">
            <FaArrowLeft /> Back to Knowledge Base
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to render content sections with icons
  const renderContentSection = (title: string, content: any, icon: React.ReactNode, isList = false) => {
    if (!content || (Array.isArray(content) && content.length === 0)) return null;

    return (
      <div className="content-section">
        <h3 className="section-title">
          {icon} {title}
        </h3>
        {isList && Array.isArray(content) ? (
          <ul className="feature-list">
            {content.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <div className="content-text">{content}</div>
        )}
      </div>
    );
  };

  // Helper function to render card sections
  const renderCardSection = (title: string, items: string[] | undefined, icon: React.ReactNode) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="content-section">
        <h3 className="section-title">
          {icon} {title}
        </h3>
        <div className="cards-grid">
          {items.map((item, index) => (
            <div key={index} className="card">
              <h4>{item}</h4>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to render case studies
  const renderCaseStudies = (caseStudies: any[] | undefined) => {
    if (!caseStudies || caseStudies.length === 0) return null;

    return (
      <div className="content-section">
        <h3 className="section-title">
          <FaBookOpen /> Case Studies
        </h3>
        <div className="cards-grid">
          {caseStudies.map((study, index) => (
            <div key={index} className="card">
              <h4>{study.title}</h4>
              <p><strong>Description:</strong> {study.description}</p>
              <p><strong>Outcome:</strong> {study.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to render FAQs
  const renderFAQs = (faqs: any[] | undefined) => {
    if (!faqs || faqs.length === 0) return null;

    return (
      <div className="content-section">
        <h3 className="section-title">
          <FaQuestionCircle /> Frequently Asked Questions
        </h3>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h4>{faq.question}</h4>
              <p>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="knowledge-base-category main-content">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/knowledge-base">
            <FaArrowLeft style={{ marginRight: '8px' }} /> Back to Knowledge Base
          </Link>
        </div>

        <div className="category-header">
          <h1>{category.title}</h1>
          <p className="category-description">{category.description}</p>
        </div>

        {/* Main Content Sections */}
        {renderContentSection('Overview', category.content.overview, <FaBookOpen />)}
        {renderContentSection('Key Features', category.content.keyFeatures, <FaRocket />, true)}
        {renderContentSection('Benefits', category.content.benefits, <FaLightbulb />, true)}
        {renderContentSection('Use Cases', category.content.useCases, <FaCode />, true)}
        
        {/* Optional Sections */}
        {renderCardSection('Technologies', category.content.technologies, <FaCode />)}
        {renderContentSection('Best Practices', category.content.bestPractices, <FaRocket />, true)}
        {renderContentSection('Common Challenges', category.content.commonChallenges, <FaShieldAlt />, true)}
        {renderContentSection('Implementation Tips', category.content.implementationTips, <FaTools />, true)}
        {renderContentSection('Performance Considerations', category.content.performanceConsiderations, <FaChartLine />, true)}
        {renderContentSection('Security Aspects', category.content.securityAspects, <FaShieldAlt />, true)}
        {renderCardSection('Tools & Resources', category.content.toolsAndResources, <FaTools />)}
        
        {/* Case Studies */}
        {renderCaseStudies(category.content.caseStudies)}
        
        {/* FAQs */}
        {renderFAQs(category.content.faqs)}

        {/* Related Articles */}
        {category.relatedArticles && category.relatedArticles.length > 0 && (
          <div className="content-section related-articles">
            <h3 className="section-title">
              <FaBookOpen /> Related Articles
            </h3>
            <div className="articles-grid">
              {category.relatedArticles.map((article) => (
                <Link to={`/knowledge-base/article/${article.slug}`} key={article.id} className="article-card">
                  <h4>{article.title}</h4>
                  <p>Read more about this topic in our detailed article.</p>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="back-to-kb">
          <Link to="/knowledge-base" className="btn btn-outline">
            <FaArrowLeft /> Back to Knowledge Base
          </Link>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseCategory;
