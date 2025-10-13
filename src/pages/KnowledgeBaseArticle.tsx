import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import './KnowledgeBaseArticle.css';

// Define types for the code component props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Article content data - in a real app, this would come from a CMS or API
const articleContent: Record<string, any> = {
  'payment-gateway-integration': {
    id: 7,
    title: 'Payment Gateway Integration: A Comprehensive Guide',
    category: 'Payment Processing',
    description: 'Learn how to securely integrate payment gateways into your applications with best practices and code examples.',
    content: `## Introduction to Payment Gateway Integration

Payment gateway integration is a critical component of any e-commerce or subscription-based application. This guide will walk you through the process of integrating payment gateways, security considerations, and best practices.

## Popular Payment Gateways

- **Stripe**: Developer-friendly with extensive documentation
- **PayPal**: Widely recognized and trusted
- **Square**: Great for in-person and online payments
- **Braintree**: Owned by PayPal, supports various payment methods
- **Authorize.Net**: Enterprise-grade solution

## Key Concepts

### 1. Payment Flow
1. Customer initiates payment
2. Payment details are collected
3. Data is sent to payment processor
4. Processor validates and processes payment
5. Response is returned to your application

### 2. Security Standards
- **PCI DSS Compliance**: Required for handling card data
- **Tokenization**: Replace sensitive data with tokens
- **3D Secure**: Additional authentication layer
- **Encryption**: Encrypt data in transit and at rest

## Implementation Guide

### 1. Setting Up Stripe

\`\`\`javascript
// Install Stripe
// npm install @stripe/stripe-js @stripe/react-stripe-js

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your_publishable_key');

// Create a payment intent
const { paymentIntent, error } = await fetch('/create-payment-intent', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
}).then(res => res.json());
\`\`\`

### 2. Collecting Payment Details

\`\`\`jsx
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      console.log('[error]', error);
    } else {
      // Send paymentMethod.id to your server
      const { paymentIntent, error } = await handlePayment(paymentMethod.id);
      // Handle success or error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};
\`\`\`

## Server-Side Implementation (Node.js)

\`\`\`javascript
// Install required packages
// npm install express stripe body-parser cors dotenv

require('dotenv').config();
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // Amount in cents
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
\`\`\`

## Security Best Practices

1. **Never store sensitive data**
   - Don't store credit card numbers or CVV
   - Use payment processor tokens instead

2. **Use HTTPS**
   - Always use SSL/TLS for all communications

3. **Implement webhooks**
   - Listen for payment events
   - Verify webhook signatures

4. **Rate limiting**
   - Prevent brute force attacks
   - Implement CAPTCHA if needed

## Testing Payment Flows

- **Test cards**: Use test card numbers provided by payment processors
- **Webhook testing**: Test different payment scenarios
- **Error handling**: Test declined cards and errors
- **Mobile testing**: Ensure mobile responsiveness

## Common Pitfalls

1. **Not handling webhooks properly**
   - Always verify webhook signatures
   - Handle duplicate events

2. **Insufficient error handling**
   - Handle all possible error states
   - Provide user-friendly error messages

3. **Ignoring PCI compliance**
   - Never log sensitive data
   - Use hosted payment pages when possible

## Performance Considerations

- **Lazy load payment components**
- **Optimize API calls**
- **Cache payment methods**
- **Minimize dependencies**

## Resources

- [Stripe Documentation](https://stripe.com/docs)
- [PCI Security Standards](https://www.pcisecuritystandards.org/)
- [OWASP Payment Security](https://owasp.org/www-project-payment-security/)
- [Braintree Best Practices](https://developers.braintreepayments.com/guides/general/best-practices/overview)

## Conclusion

Payment gateway integration requires careful consideration of security, user experience, and business requirements. By following best practices and leveraging the tools provided by payment processors, you can implement a robust payment solution that meets your needs.

Always stay updated with the latest security standards and regularly audit your payment flows to ensure compliance and security.`, 
    author: 'Borangi Payments Team',
    role: 'Payment Integration Specialists',
    bio: 'Our payment integration team specializes in secure and efficient payment processing solutions for businesses of all sizes.',
    date: '2025-10-15',
    readTime: '15 min read',
    tags: ['payments', 'stripe', 'ecommerce', 'security', 'api-integration']
  },
  'mobile-app-development-flutter': {
  id: 6,
  title: 'Mobile App Development with Flutter',
  category: 'Mobile Development',
  description: 'A comprehensive guide to building cross-platform mobile applications with Flutter, including best practices and performance optimization techniques.',
  content: `## Introduction to Flutter Development

Flutter is Google's UI toolkit for building natively compiled applications for mobile, web, and desktop from a single codebase. In this guide, we'll explore how to build high-quality mobile applications using Flutter.

## Why Choose Flutter?

- **Single Codebase**: Write once, deploy everywhere
- **Fast Development**: Hot reload for quick iterations
- **Beautiful UIs**: Rich set of customizable widgets
- **Native Performance**: Compiles to native ARM code
- **Growing Community**: Strong ecosystem and support

## Getting Started

### Prerequisites
- Flutter SDK
- Android Studio / Xcode
- VS Code or Android Studio with Flutter plugins
- An emulator or physical device

### Installation

\`\`\`bash
# Install Flutter on macOS
brew install --cask flutter

# Verify installation
flutter doctor
\`\`\`

## Basic Flutter App Structure

\`\`\`dart
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Flutter Demo'),
      ),
      body: Center(
        child: Text('Hello, Flutter!'),
      ),
    );
  }
}
\`\`\`

## State Management

### Provider Pattern

\`\`\`dart
import 'package:provider/provider.dart';

class Counter with ChangeNotifier {
  int _count = 0;
  int get count => _count;

  void increment() {
    _count++;
    notifyListeners();
  }
}

// In your widget tree
ChangeNotifierProvider(
  create: (_) => Counter(),
  child: MyApp(),
);

// To use in widgets
final counter = Provider.of<Counter>(context);
\`\`\`

## Navigation

### Basic Navigation

\`\`\`dart
// Navigate to a new screen
Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SecondScreen()),
);

// Pass data to a new screen
Navigator.push(
  context,
  MaterialPageRoute(
    builder: (context) => DetailScreen(data: someData),
  ),
);

// Return data from a screen
final result = await Navigator.push(
  context,
  MaterialPageRoute(builder: (context) => SelectionScreen()),
);
\`\`\`

## Working with APIs

### Making HTTP Requests

\`\`\`dart
import 'dart:convert';
import 'package:http/http.dart' as http;

Future<Post> fetchPost() async {
  final response = await http.get(
    Uri.parse('https://jsonplaceholder.typicode.com/posts/1'),
  );

  if (response.statusCode == 200) {
    return Post.fromJson(json.decode(response.body));
  } else {
    throw Exception('Failed to load post');
  }
}

class Post {
  final int userId;
  final int id;
  final String title;
  final String body;

  Post({this.userId, this.id, this.title, this.body});

  factory Post.fromJson(Map<String, dynamic> json) {
    return Post(
      userId: json['userId'],
      id: json['id'],
      title: json['title'],
      body: json['body'],
    );
  }
}
\`\`\`

## Performance Optimization

### Const Constructors

\`\`\`dart
// Good
const Text('Hello, Flutter!')

// Better than
Text('Hello, Flutter!')
\`\`\`

### ListView.builder for Long Lists

\`\`\`dart
ListView.builder(
  itemCount: items.length,
  itemBuilder: (context, index) {
    return ListTile(
      title: Text('Item \${items[index]}'),
    );
  },
)
\`\`\`

## Testing

### Unit Test Example

\`\`\`dart
void main() {
  test('Counter value should be incremented', () {
    final counter = Counter();
    
    counter.increment();
    
    expect(counter.value, 1);
  });
}
\`\`\`

## Deployment

### Building for Production

\`\`\`bash
# Build Android APK
flutter build apk --release

# Build iOS
flutter build ios --release
\`\`\`

## Best Practices

1. **Widget Composition**: Break down complex UIs into smaller widgets
2. **State Management**: Choose the right solution for your app's complexity
3. **Performance**: Be mindful of build() methods and use const widgets
4. **Error Handling**: Implement proper error boundaries and logging
5. **Testing**: Write unit, widget, and integration tests
6. **Code Organization**: Follow a consistent project structure

## Resources

- [Flutter Documentation](https://flutter.dev/docs)
- [Flutter Gallery](https://github.com/flutter/gallery)
- [Pub.dev](https://pub.dev) - Flutter packages
- [Flutter DevTools](https://flutter.dev/docs/development/tools/devtools/overview)

## Conclusion

Flutter provides a powerful and efficient way to build beautiful, natively compiled applications for multiple platforms from a single codebase. By following best practices and leveraging the rich ecosystem of packages, you can build high-quality applications efficiently.

Start small, experiment with different widgets, and gradually explore more advanced topics as you become comfortable with the framework. Happy coding!`,
  author: 'Borangi Mobile Team',
  role: 'Mobile Development Team',
  bio: 'Our mobile development team specializes in building high-performance, cross-platform applications using Flutter and other modern technologies.',
  date: '2025-10-14',
  readTime: '20 min read',
  tags: ['flutter', 'mobile', 'cross-platform', 'dart', 'app-development']
},
  'ci-cd-github-actions': {
    id: 5,
    title: 'CI/CD with GitHub Actions',
    category: 'DevOps',
    description: 'A comprehensive guide to setting up continuous integration and deployment pipelines using GitHub Actions for your projects.',
    content: `## Introduction to CI/CD with GitHub Actions

Continuous Integration and Continuous Deployment (CI/CD) has become an essential practice in modern software development. GitHub Actions provides a powerful platform to automate your build, test, and deployment workflows right from your GitHub repository.

## Why GitHub Actions?

- **Native Integration**: Directly integrated with GitHub repositories
- **Flexible Workflows**: Customizable YAML-based workflow files
- **Extensive Marketplace**: Thousands of pre-built actions
- **Free for Public Repositories**: Great for open-source projects
- **Cross-Platform**: Run on Linux, Windows, and macOS

## Getting Started

### Prerequisites
- A GitHub account
- A repository for your project
- Basic understanding of YAML syntax

## Basic Workflow Example

Here's a simple workflow that runs tests on every push to the main branch:

\`\`\`yaml
name: CI Pipeline

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'
    
    - name: Install Dependencies
      run: npm ci
    
    - name: Run Tests
      run: npm test
\`\`\`

## Advanced CI/CD Pipeline

### Build and Deploy to Production

\`\`\`yaml
name: Production Deployment

on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18.x'
        cache: 'npm'
    
    - name: Install Dependencies
      run: npm ci
    
    - name: Run Tests
      run: npm test
    
    - name: Build Application
      run: npm run build
      env:
        NODE_ENV: production
    
    - name: Deploy to Production
      uses: some-deployment-action@v1
      with:
        server: \${{ secrets.PRODUCTION_SERVER }}
        username: \${{ secrets.PRODUCTION_USERNAME }}
        key: \${{ secrets.PRODUCTION_SSH_KEY }}
\`\`\`

## Best Practices

1. **Use Secrets for Sensitive Data**
   - Never hardcode API keys or credentials
   - Use GitHub Secrets for sensitive information

2. **Matrix Testing**
   Test across multiple environments:
   \`\`\`yaml
   strategy:
     matrix:
       node-version: [14.x, 16.x, 18.x]
       os: [ubuntu-latest, windows-latest, macos-latest]
   \`\`\`

3. **Cache Dependencies**
   - Cache npm/yarn/pip packages to speed up builds
   - Example for npm:
     \`\`\`yaml
     - name: Cache node modules
       uses: actions/cache@v3
       with:
         path: ~/.npm
         key: \${{ runner.os }}-node-\${{ hashFiles('**/package-lock.json') }}
         restore-keys: |
           \${{ runner.os }}-node-
     \`\`\`

4. **Environment-Specific Deployments**
   - Use different workflows for staging and production
   - Protect main branch with branch protection rules
   - Require status checks to pass before merging

5. **Automated Versioning and Releases**
   - Automate version bumps with semantic-release
   - Generate changelogs automatically
   - Publish packages to npm/GitHub Packages

## Monitoring and Notifications

### Slack Notifications
\`\`\`yaml
- name: Notify Slack
  uses: rtCamp/action-slack-notify@v2
  env:
    SLACK_WEBHOOK: \${{ secrets.SLACK_WEBHOOK_URL }}
    STATUS: \${{ job.status }}
\`\`\`

## Common Workflow Examples

### Scheduled Tasks
\`\`\`yaml
on:
  schedule:
    - cron: '0 0 * * *'  # Runs at midnight UTC every day
\`\`\`

### Manual Triggers
\`\`\`yaml
on:
  workflow_dispatch:
    inputs:
      environment:
        description: 'Environment to deploy to'
        required: true
        default: 'staging'
\`\`\`

## Troubleshooting

- **Debugging Workflows**: Add \`ACTIONS_STEP_DEBUG\` secret with value \`true\` to enable debug logging
- **Workflow Visualization**: Use the "Actions" tab in your GitHub repository to visualize workflow runs
- **Logs**: Check the "Actions" tab for detailed logs of each workflow run

## Conclusion

GitHub Actions provides a powerful and flexible way to automate your CI/CD pipelines directly within GitHub. By following best practices and leveraging the extensive marketplace of actions, you can create robust workflows that improve your development process and deployment reliability.

## Further Reading

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Marketplace](https://github.com/marketplace?type=actions)
- [GitHub Actions Workflow Syntax](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions)`,
    author: 'Borangi DevOps Team',
    role: 'DevOps Engineering Team',
    bio: 'Our DevOps team specializes in creating efficient and secure CI/CD pipelines for modern applications.',
    date: '2025-10-13',
    readTime: '15 min read',
    tags: ['github-actions', 'ci-cd', 'devops', 'automation', 'deployment']
  },
  'nodejs-performance-optimization': {
    id: 2,
    title: 'Node.js Performance Optimization',
    category: 'Backend Development',
    description: 'Advanced techniques and best practices for optimizing Node.js application performance, including event loop management, memory optimization, and scaling strategies.',
    content: `## Introduction

Node.js is known for its non-blocking I/O model and event-driven architecture, but building high-performance applications requires careful consideration of various factors. In this guide, we'll explore techniques to optimize your Node.js applications for better performance and scalability.

## Understanding the Event Loop

Node.js uses a single-threaded event loop to handle concurrent operations. Understanding how it works is crucial for writing efficient code.

### Key Concepts:
- **Event Loop**: Handles asynchronous callbacks
- **Libuv**: The library that implements the event loop
- **Worker Threads**: For CPU-intensive operations
- **Clustering**: Utilizing multiple CPU cores

## Performance Optimization Techniques

### 1. Use the Latest Node.js Version
Always use the latest LTS version to benefit from performance improvements and security updates.

### 2. Enable Gzip Compression
Reduce response sizes by enabling Gzip compression in your web server or middleware.

\`\`\`javascript
const compression = require('compression');
const express = require('express');
const app = express();

// Enable gzip compression
app.use(compression());
\`\`\`

### 3. Implement Caching

#### In-Memory Caching
\`\`\`javascript
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 }); // 10 minutes TTL

function getCachedOrFetch(key, fetchFunction) {
  const cachedData = cache.get(key);
  if (cachedData) {
    return Promise.resolve(cachedData);
  }
  return fetchFunction().then(data => {
    cache.set(key, data);
    return data;
  });
}
\`\`\`

#### Redis Caching
For distributed caching across multiple instances:
\`\`\`javascript
const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
const setAsync = promisify(client.set).bind(client);

async function getCachedData(key) {
  const cached = await getAsync(key);
  return cached ? JSON.parse(cached) : null;
}
\`\`\`

### 4. Optimize Database Queries
- Use indexes effectively
- Project only needed fields
- Implement pagination for large result sets
- Use connection pooling

### 5. Use Worker Threads for CPU-Intensive Tasks
Offload CPU-heavy operations to worker threads to prevent blocking the event loop.

\`\`\`javascript
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
  module.exports = function runWorker(data) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: data
      });
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error('Worker stopped with exit code ' + code));
      });
    });
  };
} else {
  // Worker thread code
  const result = processData(workerData);
  parentPort.postMessage(result);
}
\`\`\`

## Monitoring and Profiling

### 1. Use the Built-in Profiler
\`\`\`bash
node --prof your-app.js
\`\`\`

### 2. Monitor Event Loop Latency
\`\`\`javascript
const monitor = require('event-loop-lag');
const lag = monitor(1000); // Check every second

setInterval(() => {
  console.log('Event loop lag:', lag() + 'ms');
}, 1000);
\`\`\`

## Conclusion

Optimizing Node.js applications requires a combination of understanding the event loop, efficient coding practices, and proper tooling. By implementing these techniques and continuously monitoring your application's performance, you can build highly performant and scalable Node.js applications.

Remember to measure before and after making optimizations to ensure they have the desired effect. Performance tuning is an ongoing process that should be part of your regular development cycle.`,
    author: 'Borangi Backend Team',
    role: 'Backend Engineering Team',
    bio: 'This piece was collaboratively written by the engineers of the Borangi Backend Team.',
    date: '2025-10-11',
    readTime: '20 min read',
    tags: ['nodejs', 'performance', 'optimization', 'backend']
  },
  'getting-started-with-react-typescript': {
    id: 1,
    title: 'Getting Started with React and TypeScript',
    category: 'Web Development',
    description: 'Comprehensive guide to setting up a new React project with TypeScript, including configuration, type definitions, and best practices for type safety.',
    content: `## Introduction

In today's fast-paced web development landscape, combining React with TypeScript has become the gold standard for building robust, maintainable, and scalable applications. As the lead developer at BorangiLABS, I've seen firsthand how TypeScript's static typing can prevent bugs and improve developer experience in React applications.

## Why TypeScript with React?

TypeScript brings several advantages to React development:

- **Type Safety**: Catch errors during development rather than at runtime
- **Better Developer Experience**: Enhanced autocompletion and IntelliSense
- **Self-Documenting Code**: Types serve as living documentation
- **Easier Refactoring**: Safely rename components and props with confidence

## Setting Up a New Project

### Prerequisites
- Node.js (v14 or later)
- npm (v6 or later) or Yarn
- Basic understanding of React

### Create a New Project

Using Create React App with TypeScript template:

\`\`\`bash
npx create-react-app my-app --template typescript
# or
yarn create react-app my-app --template typescript
\`\`\`

### Project Structure

Your project structure will look like this:

\`\`\`
my-app/
├── node_modules/
├── public/
├── src/
│   ├── App.css
│   ├── App.test.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── index.tsx
│   ├── logo.svg
│   ├── react-app-env.d.ts
│   ├── setupTests.ts
│   └── reportWebVitals.ts
├── package.json
├── tsconfig.json
└── README.md
\`\`\`

## Key TypeScript Concepts for React

### Typing Props

\`\`\`tsx
interface UserProfileProps {
  name: string;
  age: number;
  isAdmin?: boolean;
  onLogin: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  name, 
  age, 
  isAdmin = false, 
  onLogin 
}) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>Age: {age}</p>
      {isAdmin && <p>Admin User</p>}
      <button onClick={onLogin}>Log In</button>
    </div>
  );
};
\`\`\`

### Typing Hooks

#### useState

\`\`\`tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);
\`\`\`

#### useEffect

\`\`\`tsx
useEffect(() => {
  const fetchData = async () => {
    const response = await fetch('/api/user');
    const data = await response.json();
    setUser(data);
  };
  
  fetchData();
}, []);
\`\`\`

## Best Practices

1. **Enable Strict Mode**  
   Ensure your \`tsconfig.json\` has \`strict: true\`

2. **Use Interfaces for Props**  
   Prefer interfaces over type aliases for component props

3. **Type All Props**  
   Avoid using \`any\` - always provide proper types

4. **Use TypeScript with React Hooks**  
   Always type your hooks for better type inference

## Common Pitfalls

1. **Overusing any**  
   \`any\` defeats the purpose of TypeScript. Use proper types or \`unknown\` when the type is truly dynamic.

2. **Not Typing Event Handlers**  
   Always type your event handlers for better type safety:
   \`\`\`tsx
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     setValue(e.target.value);
   };
   \`\`\`

## Real-World Example: Building a Type-Safe Component

Here's a simple example of a type-safe React component with TypeScript:

\`\`\`typescript
import React, { useState } from 'react';

interface UserProfileProps {
  name: string;
  age: number;
  email: string;
  isAdmin?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
  name, 
  age, 
  email, 
  isAdmin = false 
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  return (
    <div className="user-profile">
      <h2>{name} {isAdmin && '(Admin)'}</h2>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
      <button onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
    </div>
  );
};

export default UserProfile;
\`\`\`

## Conclusion

TypeScript brings significant benefits to React development by adding static typing. While there's a learning curve, the long-term benefits in terms of code quality, maintainability, and developer experience are well worth the investment.

At BorangiLABS, we've seen a significant reduction in runtime errors and an improvement in code quality since adopting TypeScript across our React projects. Start with the basics, and gradually incorporate more advanced TypeScript features as you become comfortable with the language.

## Next Steps

1. Explore advanced TypeScript features like generics and utility types
2. Learn about type inference and when to explicitly type variables
3. Check out the official [TypeScript documentation](https://www.typescriptlang.org/docs/)
4. Experiment with TypeScript in your next React project`,
    author: 'Erick Okioma',
    role: 'Lead Developer',
    bio: 'Erick Okioma is the Lead Developer at BorangiLABS, specializing in modern web technologies and best practices. Erick is passionate about building scalable, maintainable applications and mentoring the next generation of developers.',
    date: '2025-10-10',
    readTime: '12 min read',
    tags: ['react', 'typescript', 'web development', 'frontend']
  },
  'mongodb-schema-design': {
    id: 3,
    title: 'MongoDB Schema Design: Best Practices and Patterns for Scalable Applications',
    category: 'Database',
    description: 'Comprehensive guide to MongoDB schema design patterns, best practices, and optimization techniques for building high-performance, scalable applications with MongoDB.',
    content: `# MongoDB Schema Design: Best Practices and Patterns

## Introduction to MongoDB Schema Design

MongoDB's document model offers unparalleled flexibility in how you structure your data. However, this flexibility comes with the responsibility of making informed schema design decisions that impact your application's performance, scalability, and maintainability. In this comprehensive guide, we'll explore MongoDB schema design patterns, anti-patterns to avoid, and optimization techniques used by industry leaders.

## Understanding MongoDB's Document Model

### Document Structure Basics

MongoDB stores data in BSON (Binary JSON) documents, which are then organized into collections. Unlike relational databases, MongoDB doesn't enforce a rigid schema, allowing for flexible, schema-less document structures.

### Key Considerations for Schema Design

- **Data Access Patterns**: Design your schema based on how your application queries and updates data
- **Read/Write Ratio**: Optimize for your application's specific read/write patterns
- **Data Relationships**: Understand when to embed documents versus reference them
- **Data Lifecycle**: Consider how your data will grow and change over time

## Common Schema Design Patterns

### 1. Embedded Document Pattern

Ideal for one-to-one or one-to-many relationships where related data is frequently accessed together.

\`\`\`javascript
// User with embedded addresses
{
  _id: "user123",
  name: "John Doe",
  email: "john@example.com",
  addresses: [
    {
      type: "home",
      street: "123 Main St",
      city: "Nairobi",
      country: "Kenya",
      isDefault: true
    },
    {
      type: "work",
      company: "Acme Inc",
      street: "456 Business Ave",
      city: "Nairobi",
      country: "Kenya"
    }
  ]
}
\`\`\`

### 2. Reference Pattern

Better for many-to-many relationships or when documents exceed the 16MB size limit.

\`\`\`javascript
// Posts collection
{
  _id: ObjectId("5f8d0d55b54764421b000001"),
  title: "MongoDB Schema Design",
  content: "...",
  author: ObjectId("5f8d0d55b54764421b000002"),
  tags: ["mongodb", "database", "schema"],
  createdAt: ISODate("2025-10-13T15:30:00Z")
}

// Users collection
{
  _id: ObjectId("5f8d0d55b54764421b000002"),
  username: "dev_expert",
  email: "dev@example.com"
}
\`\`\`

### 3. Subset Pattern

Optimize for performance by storing frequently accessed data with the main document and less frequently accessed data in a separate collection.

### 4. Bucket Pattern

Ideal for time-series data or when dealing with documents that grow without bound.

\`\`\`javascript
// Sensor data bucketed by hour
{
  sensor_id: "sensor123",
  date: ISODate("2025-10-13T00:00:00Z"),
  measurements: [
    { timestamp: ISODate("2025-10-13T00:01:00Z"), value: 24.5 },
    { timestamp: ISODate("2025-10-13T00:02:00Z"), value: 24.6 },
    // ... more measurements for this hour
  ]
}
\`\`\`

## Schema Design Best Practices

### 1. Favor Embedded Documents for Read Performance

Embed related data that is frequently accessed together to reduce the number of queries needed.

### 2. Use References for Many-to-Many Relationships

\`\`\`javascript
// Products collection
{
  _id: ObjectId("60d5ec9e8c1a8e3f2c8b4567"),
  name: "Wireless Mouse",
  price: 29.99,
  categories: [
    ObjectId("60d5ec9e8c1a8e3f2c8b4599"), // Electronics
    ObjectId("60d5ec9e8c1a8e3f2c8b4600")  // Computer Accessories
  ]
}

// Categories collection
{
  _id: ObjectId("60d5ec9e8c1a8e3f2c8b4599"),
  name: "Electronics",
  description: "Electronic devices and components"
}
\`\`\`

### 3. Consider Data Access Patterns

Design your schema based on how your application queries data, not just how the data relates logically.

### 4. Plan for Growth

- Use the Bucket Pattern for time-series data
- Implement document versioning for evolving schemas
- Consider sharding strategies for large collections

## Performance Optimization Techniques

### 1. Indexing Strategies

Create indexes to support your most common queries:

\`\`\`javascript
// Single field index
db.products.createIndex({ name: 1 });

// Compound index
db.orders.createIndex({ customerId: 1, orderDate: -1 });

// Text index for search
db.articles.createIndex({ title: "text", content: "text" });
\`\`\`

### 2. Use Projection to Limit Returned Fields

Only retrieve the fields you need:

\`\`\`javascript
// Only return name and price fields
db.products.find(
  { category: "Electronics" },
  { name: 1, price: 1, _id: 0 }
);
\`\`\`

### 3. Implement Caching

Use MongoDB's built-in caching or implement application-level caching for frequently accessed data.

## Common Anti-patterns to Avoid

1. **Large Arrays**: Avoid unbounded arrays that can grow without limit
2. **Excessively Large Documents**: Keep documents under 16MB and consider splitting if they grow too large
3. **Over-Normalization**: Don't normalize your data as you would in a relational database
4. **Unindexed Queries**: Always ensure your queries use indexes

## Real-World Example: E-commerce Schema

Let's design a schema for an e-commerce platform:

\`\`\`javascript
// Products collection
{
  _id: ObjectId("60d5ec9e8c1a8e3f2c8b4567"),
  sku: "WM-001",
  name: "Wireless Mouse",
  description: "Ergonomic wireless mouse with 12-month battery life",
  price: 29.99,
  category: ObjectId("60d5ec9e8c1a8e3f2c8b4599"),
  attributes: {
    color: "Black",
    connectivity: "2.4GHz Wireless",
    dpi: 1600
  },
  inventory: {
    inStock: true,
    quantity: 150,
    lastRestocked: ISODate("2025-10-01T08:30:00Z")
  },
  ratings: [
    { userId: ObjectId("60d5ec9e8c1a8e3f2c8b4700"), rating: 5, comment: "Great mouse!" },
    { userId: ObjectId("60d5ec9e8c1a8e3f2c8b4701"), rating: 4 }
  ],
  averageRating: 4.5,
  reviewCount: 2,
  createdAt: ISODate("2025-09-15T10:00:00Z"),
  updatedAt: ISODate("2025-10-10T14:30:00Z")
}

// Orders collection
{
  _id: ObjectId("70d5ec9e8c1a8e3f2c8b5001"),
  orderNumber: "ORD-2025-1001",
  customerId: ObjectId("60d5ec9e8c1a8e3f2c8b4700"),
  items: [
    {
      productId: ObjectId("60d5ec9e8c1a8e3f2c8b4567"),
      name: "Wireless Mouse",
      quantity: 2,
      price: 29.99,
      subtotal: 59.98
    }
  ],
  shippingAddress: {
    name: "Jane Smith",
    street: "123 Tech Street",
    city: "Nairobi",
    country: "Kenya",
    postalCode: "00100"
  },
  status: "completed",
  subtotal: 59.98,
  tax: 9.60,
  shipping: 5.00,
  total: 74.58,
  paymentMethod: "credit_card",
  createdAt: ISODate("2025-10-10T09:15:30Z"),
  updatedAt: ISODate("2025-10-12T14:20:00Z")
}
\`\`\`

## Schema Migration Strategies

1. **Versioned Schema**: Include a version field in your documents
2. **Backward Compatibility**: Ensure new schema versions can handle old document formats
3. **Migration Scripts**: Write scripts to update existing documents to the new schema
4. **Gradual Migration**: Migrate documents gradually during low-traffic periods

## Monitoring and Maintenance

- Use MongoDB Atlas Performance Advisor to identify slow queries
- Set up alerts for collection growth
- Regularly review query performance with explain()
- Monitor index usage and remove unused indexes

## Conclusion

Effective MongoDB schema design is both an art and a science. By understanding your application's data access patterns and leveraging MongoDB's flexible document model, you can create schemas that are both performant and maintainable. Remember to:

- Design for your most common queries
- Consider both read and write patterns
- Plan for growth and evolution
- Regularly review and optimize your schema

At BorangiLABS, we've successfully implemented these patterns in production environments, achieving significant performance improvements and scalability for our clients' applications.

## Next Steps

1. Experiment with different schema designs for your specific use case
2. Use the MongoDB Schema Analyzer to evaluate your schema
3. Learn about MongoDB Atlas for managed database solutions
4. Explore MongoDB's aggregation framework for complex data processing

## Additional Resources

- [MongoDB Schema Design Patterns](https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/)
- [MongoDB Performance Best Practices](https://www.mongodb.com/docs/manual/administration/performance-best-practices/)
- [MongoDB University - M320: Data Modeling](https://university.mongodb.com/courses/M320/about)`,
    author: 'Borangi Backend Team',
    role: 'Database Engineering Team',
    bio: 'This guide was collaboratively written by the database experts at BorangiLABS, who specialize in designing high-performance, scalable database solutions for modern applications.',
    date: '2025-10-13',
    readTime: '15 min read',
    tags: ['mongodb', 'database', 'schema design', 'performance', 'backend']
  },
  'building-scalable-apis-express': {
    id: 4,
    title: 'Building Scalable APIs with Express: Best Practices and Architecture Patterns',
    category: 'Backend Development',
    description: 'Comprehensive guide to building high-performance, maintainable, and scalable RESTful APIs using Express.js, including architecture patterns, performance optimization, and production-ready practices.',
    content: `# Building Scalable APIs with Express: Best Practices and Architecture Patterns

## Introduction to Scalable API Design

In today's digital landscape, building scalable APIs is crucial for handling growing user bases and increasing data loads. Express.js, with its minimalist approach and extensive middleware ecosystem, provides an excellent foundation for creating robust RESTful APIs. This guide will walk you through the best practices, patterns, and techniques we use at BorangiLABS to build production-grade, scalable APIs.

## Table of Contents

1. [Project Structure and Organization](#project-structure)
2. [API Design Principles](#api-design-principles)
3. [Performance Optimization](#performance-optimization)
4. [Error Handling and Logging](#error-handling)
5. [Authentication and Authorization](#authentication)
6. [Caching Strategies](#caching)
7. [Rate Limiting and Throttling](#rate-limiting)
8. [API Documentation](#api-documentation)
9. [Testing Strategies](#testing)
10. [Monitoring and Observability](#monitoring)
11. [Containerization and Deployment](#deployment)
12. [Scaling Strategies](#scaling)

## Project Structure and Organization

A well-organized project structure is the foundation of a maintainable and scalable API. Here's a recommended structure:

\`\`\`
/src
  /config         # Configuration files
  /controllers    # Route controllers
  /middlewares    # Custom middleware
  /models         # Database models
  /routes         # Route definitions
  /services       # Business logic
  /utils          # Helper functions
  /validators     # Request validation
  /types          # TypeScript type definitions
  app.ts          # Express app setup
  server.ts       # Server initialization
\`\`\`

### Key Benefits:
- **Separation of Concerns**: Clear boundaries between different parts of the application
- **Testability**: Easier to write unit and integration tests
- **Maintainability**: Simpler to navigate and understand the codebase
- **Scalability**: Easier to add new features without creating a mess

## API Design Principles

### RESTful Design

Follow REST principles for predictable, resource-oriented endpoints:

- Use nouns (not verbs) in endpoint paths
- Use HTTP methods appropriately (GET, POST, PUT, PATCH, DELETE)
- Return appropriate HTTP status codes
- Use plural nouns for collections (e.g., '/users', not '/user')

### Versioning

Implement API versioning from the start to maintain backward compatibility:

\`\`\`javascript
// Version in URL path
app.use('/api/v1/users', userRoutes);

// Version in headers
app.use('/api/users', (req, res, next) => {
  const version = req.headers['accept-version'] || '1.0.0';
  if (version.startsWith('1.')) return userRoutesV1(req, res, next);
  if (version.startsWith('2.')) return userRoutesV2(req, res, next);
  next(new Error('Unsupported API version'));
});
\`\`\`

### Request/Response Format

Standardize your API responses:

\`\`\`javascript
// Success response
{
  "success": true,
  "data": {
    // Your data here
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}

// Error response
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
\`\`\`

## Performance Optimization

### Database Optimization

- **Indexing**: Create indexes for frequently queried fields
- **Query Optimization**: Use projection to select only needed fields
- **Connection Pooling**: Configure connection pools for database connections
- **Read Replicas**: For read-heavy applications, use read replicas

### Response Compression

Enable response compression to reduce bandwidth:

\`\`\`javascript
import compression from 'compression';

app.use(compression());
\`\`\`

### Response Caching

Implement response caching for frequently accessed data:

\`\`\`javascript
import apicache from 'apicache';

// Simple in-memory cache
const cache = apicache.middleware;

// Cache all GET requests for 5 minutes
app.get('/api/endpoint', cache('5 minutes'), (req, res) => {
  // Your route handler
});
\`\`\`

## Error Handling and Logging

### Centralized Error Handling

Create a centralized error handling middleware:

\`\`\`javascript
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const response = {
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  };

  res.status(statusCode).json(response);
});
\`\`\`

### Structured Logging

Use a logging library like Winston or Pino:

\`\`\`javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// Usage
logger.info('Server started', { port: process.env.PORT });
logger.error('Database connection failed', { error: err });
\`\`\`

## Authentication and Authorization

### JWT Authentication

Implement JWT (JSON Web Tokens) for stateless authentication:

\`\`\`javascript
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const jwtVerify = promisify(jwt.verify).bind(jwt);

// Generate token
const generateToken = (userId) => {
  return jwt.sign(
    { sub: userId },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

// Verify token middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: { code: 'UNAUTHORIZED', message: 'Authentication required' }
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = await jwtVerify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    next(new Error('Invalid or expired token'));
  }
};
\`\`\`

### Role-Based Access Control (RBAC)

Implement role-based access control for authorization:

\`\`\`javascript
const roles = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest'
};

const checkRole = (requiredRoles = []) => {
  return (req, res, next) => {
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Insufficient permissions' }
      });
    }
    next();
  };
};

// Usage
router.get('/admin/dashboard', authenticate, checkRole([roles.ADMIN]), (req, res) => {
  // Admin dashboard logic
});
\`\`\`

## Caching Strategies

### Client-Side Caching

Set appropriate cache headers:

\`\`\`javascript
app.get('/api/data', (req, res) => {
  // Cache for 1 hour (3600 seconds)
  res.set('Cache-Control', 'public, max-age=3600');
  res.json({ data: 'cached data' });
});
\`\`\`

### Server-Side Caching with Redis

Implement Redis for distributed caching:

\`\`\`javascript
import Redis from 'ioredis';
const redis = new Redis(process.env.REDIS_URL);

const cache = (duration) => {
  return async (req, res, next) => {
    const key = 'express_' + (req.originalUrl || req.url);
    const cached = await redis.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    } else {
      const originalSend = res.json;
      res.json = (body) => {
        redis.setex(key, duration, JSON.stringify(body));
        return originalSend.call(res, body);
      };
      next();
    }
  };
};
\`\`\`

## Rate Limiting and Throttling

Protect your API from abuse with rate limiting:

\`\`\`javascript
import rateLimit from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Too many requests, please try again later.'
    }
  }
});

// Apply to all API routes
app.use('/api/', apiLimiter);
\`\`\`

## API Documentation

### OpenAPI/Swagger

Document your API using Swagger/OpenAPI:

\`\`\`javascript
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'API documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
\`\`\`

## Testing Strategies

### Unit Testing with Jest

Write unit tests for your business logic:

\`\`\`javascript
// userService.test.js
const userService = require('./userService');

describe('User Service', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = { email: 'test@example.com', password: 'password123' };
      const user = await userService.createUser(userData);
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
    });
  });
});
\`\`\`

### Integration Testing with Supertest

Test your API endpoints:

\`\`\`javascript
const request = require('supertest');
const app = require('../app');

describe('User API', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
  });
});
\`\`\`

## Monitoring and Observability

### Health Check Endpoint

Add a health check endpoint:

\`\`\`javascript
app.get('/health', (req, res) => {
  const healthcheck = {
    status: 'UP',
    timestamp: Date.now(),
    uptime: process.uptime(),
    database: 'connected', // Check DB connection status
    memory: process.memoryUsage(),
    // Add more checks as needed
  };
  
  res.json(healthcheck);
});
\`\`\`

### Application Performance Monitoring (APM)

Integrate with APM tools like New Relic or Datadog:

\`\`\`javascript
// New Relic
require('newrelic');

// Or Datadog
const tracer = require('dd-trace').init({
  logInjection: true,
  runtimeMetrics: true,
  // Other configuration
});
\`\`\`

## Containerization and Deployment

### Dockerfile

Create a production-ready Dockerfile:

\`\`\`dockerfile
# Use Node.js LTS
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

# Expose the app port
EXPOSE 3000

# Run the app
CMD [ "node", "dist/server.js" ]
\`\`\`

### Docker Compose

For local development with dependencies:

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgres://user:password@db:5432/mydb
    depends_on:
      - db
    volumes:
      - .:/usr/src/app
      - /usr/src/app/node_modules

  db:
    image: postgres:13
    environment:
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mydb
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
\`\`\`

## Scaling Strategies

### Horizontal Scaling

- **Load Balancing**: Use Nginx or HAProxy to distribute traffic
- **Stateless Design**: Keep sessions in Redis or JWT tokens
- **Database Scaling**: Consider read replicas or sharding

### Microservices Architecture

For large applications, consider breaking into microservices:

\`\`\`
/services
  /auth-service
  /user-service
  /product-service
  /order-service
  /payment-service
\`\`\`

## Conclusion

Building scalable APIs with Express requires careful planning and adherence to best practices. By following the patterns and techniques outlined in this guide, you'll be well on your way to creating robust, maintainable, and high-performance APIs that can scale with your application's needs.

Remember to:

1. **Design for scale** from the beginning
2. **Monitor performance** and set up alerts
3. **Test thoroughly** at all levels
4. **Document** your API comprehensively
5. **Plan for failure** with proper error handling and fallbacks

At BorangiLABS, we've successfully implemented these patterns in production environments, achieving high availability and performance for our clients' applications.

## Next Steps

1. Explore advanced topics like GraphQL with Express
2. Learn about API Gateway patterns
3. Implement gRPC for internal service communication
4. Study distributed systems patterns

## Additional Resources

- [Express Best Practices](https://expressjs.com/en/advanced/best-practice-performance.html)
- [Node.js Production Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [REST API Design Best Practices](https://www.moesif.com/blog/technical/api-design/REST-API-Design-Best-Practices/)
- [The Twelve-Factor App](https://12factor.net/)`,
    author: 'Borangi Backend Team',
    role: 'Backend Engineering Team',
    bio: 'This guide was collaboratively written by the backend engineering team at BorangiLABS, who specialize in building high-performance, scalable APIs for modern applications.',
    date: '2025-10-13',
    readTime: '20 min read',
    tags: ['express', 'nodejs', 'api', 'backend', 'scalability', 'performance']
  }
};

// Get article by slug
const getArticleBySlug = (slug: string) => {
  return articleContent[slug] || null;
};

const KnowledgeBaseArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : null;

  // Scroll to top when the article changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!article) {
    return (
      <div className="blog-detail-not-found">
        <h2>Article not found</h2>
        <Link to="/knowledge-base" className="back-to-knowledge-base">
          Back to Knowledge Base
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <article className="blog-article">
        <header className="blog-header">
          <div className="container">
            <div className="blog-meta">
              <span className="blog-category">{article.category}</span>
              <span className="blog-date">{article.date}</span>
              <span className="blog-read-time">{article.readTime}</span>
            </div>
            <h1 className="blog-title">{article.title}</h1>
            <div className="blog-author">By {article.author}</div>
          </div>
        </header>

        <div className="container">
          <div className="blog-content">
            <div className="blog-tags">
              {article.tags.map((tag: string, index: number) => (
                <span key={index} className="blog-tag">
                  #{tag}
                </span>
              ))}
            </div>
            
            <div className="blog-body">
              <div className="blog-content-markdown">
                <ReactMarkdown
                  components={{
                    code: ({ node, inline, className, children, ...props }: CodeProps) => {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    img: ({node, ...props}) => (
                      <div className="blog-image-container">
                        <img {...props} alt={props.alt || ''} className="blog-content-image" />
                        {props.alt && <div className="blog-image-caption">{props.alt}</div>}
                      </div>
                    ),
                    blockquote: ({node, ...props}) => (
                      <blockquote className="blog-blockquote" {...props} />
                    ),
                    a: ({node, ...props}) => {
                      // Handle internal anchor links (starting with #)
                      if (props.href?.startsWith('#')) {
                        return (
                          <a 
                            href={props.href}
                            onClick={(e) => {
                              e.preventDefault();
                              const element = document.querySelector(props.href || '');
                              if (element) {
                                element.scrollIntoView({ behavior: 'smooth' });
                              }
                            }}
                          >
                            {props.children}
                          </a>
                        );
                      }
                      
                      // Handle external links (open in new tab with noopener/noreferrer)
                      if (props.href?.startsWith('http')) {
                        return (
                          <a 
                            href={props.href} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            {props.children}
                          </a>
                        );
                      }
                      
                      // Handle internal links (without opening in new tab)
                      return <Link to={props.href || '#'}>{props.children}</Link>;
                    }
                  }}
                >
                  {article.content}
                </ReactMarkdown>
              </div>
              
              <div className="blog-author-bio">
                <h3>About the Author</h3>
                <p>{article.bio}</p>
              </div>
              

            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default KnowledgeBaseArticle;
