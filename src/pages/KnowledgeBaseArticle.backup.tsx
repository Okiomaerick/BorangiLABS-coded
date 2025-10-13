import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { FaArrowLeft } from 'react-icons/fa';
import { SiTypescript, SiReact, SiNodedotjs, SiMongodb, SiExpress, SiGithub, SiFlutter, SiFirebase } from 'react-icons/si';
import { FaCreditCard, FaLock } from 'react-icons/fa';
import './BlogDetailPage.css';

// Define types for the code component props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Define the article type
interface Article {
  id: number;
  title: string;
  category: string;
  description: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

// Article content data - in a real app, this would come from a CMS or API
const articleContent: Record<string, Article> = {
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
      <button onClick={onLogin}>Login</button>
    </div>
  );
};
\`\`\`

### Typing State

\`\`\`tsx
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<{ name: string; age: number } | null>(null);
\`\`\`

### Typing Events

\`\`\`tsx
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  console.log('Button clicked!', event.currentTarget.value);
};
\`\`\`

## Best Practices

1. **Use Functional Components with TypeScript**
   - Prefer React.FC or React.FunctionComponent for typing components
   - Use interface or type for props

2. **Leverage Type Inference**
   - Let TypeScript infer types when possible
   - Be explicit with complex types

3. **Use TypeScript with Hooks**
   - Properly type useState, useEffect, and other hooks
   - Create custom hooks with proper return types

4. **Handle Null and Undefined**
   - Use optional chaining (?.) and nullish coalescing (??)
   - Use type guards to narrow types

## Common Pitfalls

1. **Any Type Overuse**
   - Avoid using 'any' type
   - Use 'unknown' when the type is truly unknown

2. **Missing Dependencies**
   - Ensure all dependencies are properly installed with @types
   - Use '--save-dev @types/package-name' for TypeScript definitions

3. **Incorrect Type Definitions**
   - Always check the official type definitions
   - Create custom type definitions when needed

## Conclusion

TypeScript with React provides a powerful combination for building robust applications. By following these best practices and understanding the core concepts, you'll be able to leverage TypeScript's full potential in your React projects.

At BorangiLABS, we've seen significant improvements in code quality and developer productivity since adopting TypeScript. The initial learning curve is well worth the long-term benefits.

## Next Steps

1. Explore advanced TypeScript features like generics and utility types
2. Learn about TypeScript with popular React libraries (Redux, React Router, etc.)
3. Set up ESLint and Prettier with TypeScript support
4. Consider using a state management solution like Redux Toolkit with TypeScript

## Resources

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)`,
    author: 'Erick Okioma',
    date: '2025-10-19',
    readTime: '15 min read',
    tags: ['typescript', 'react', 'web development', 'frontend']
  },
  // Add more articles here with the same structure
};

// Component to render a single knowledge base article
const KnowledgeBaseArticle: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = React.useState<Article | null>(null);
  const [notFound, setNotFound] = React.useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (slug && articleContent[slug]) {
      setArticle(articleContent[slug]);
      setNotFound(false);
    } else {
      setNotFound(true);
    }
  }, [slug]);

  // Custom renderers for markdown components
  const components = {
    code({ node, inline, className, children, ...props }: CodeProps) {
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
    img({ node, ...props }: { node?: any; [key: string]: any }) {
      return <img {...props} style={{ maxWidth: '100%' }} alt={props.alt || ''} />;
    },
    blockquote({ node, ...props }: { node?: any; [key: string]: any }) {
      return <blockquote className="blockquote" {...props} />;
    },
    a({ node, ...props }: { node?: any; [key: string]: any }) {
      const isExternal = props.href?.startsWith('http');
      
      if (isExternal) {
        return (
          <a 
            href={props.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {props.children}
          </a>
        );
      }
      
      return (
        <Link 
          to={props.href} 
          className="text-blue-500 hover:underline"
        >
          {props.children}
        </Link>
      );
    },
  };

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="mb-4">The requested article could not be found.</p>
          <Link 
            to="/knowledge-base" 
            className="inline-flex items-center text-blue-500 hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back to Knowledge Base
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to="/knowledge-base" 
          className="inline-flex items-center text-blue-500 hover:underline"
        >
          <FaArrowLeft className="mr-2" /> Back to Knowledge Base
        </Link>
      </div>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <div className="flex flex-wrap items-center text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {article.category}
            </span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
            <span className="mx-2">•</span>
            <span>{article.readTime}</span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
          
          <div className="prose max-w-none">
            <ReactMarkdown components={components}>
              {article.content}
            </ReactMarkdown>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                  {article.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {article.author}
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime={article.date}>
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span 
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
      
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Related Articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(articleContent)
            .filter(([key]) => key !== slug)
            .slice(0, 3)
            .map(([key, relatedArticle]) => (
              <Link 
                key={key}
                to={`/knowledge-base/${key}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{relatedArticle.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{relatedArticle.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{relatedArticle.readTime}</span>
                    <span className="mx-2">•</span>
                    <span>{relatedArticle.category}</span>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBaseArticle;
