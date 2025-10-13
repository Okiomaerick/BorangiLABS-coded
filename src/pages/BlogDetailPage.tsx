import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { getBlogBySlug } from '../data/blogs';
import './BlogDetailPage.css';

// Define types for the code component props
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const blog = slug ? getBlogBySlug(slug) : null;

  // Scroll to top when the blog post changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!blog) {
    return (
      <div className="blog-detail-not-found">
        <h2>Blog post not found</h2>
        <Link to="/blog" className="back-to-blog">
          ← Back to Blog
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
              <span className="blog-category">{blog.category}</span>
              <span className="blog-date">{blog.date}</span>
              <span className="blog-read-time">{blog.readTime}</span>
            </div>
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-author">By {blog.author}</div>
          </div>
        </header>

        <div className="blog-featured-image">
          <img src={blog.image} alt={blog.title} />
        </div>

        <div className="container">
          <div className="blog-content">
            <div className="blog-tags">
              {blog.tags.map((tag, index) => (
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
                        const href = props.href; // Store href in a const to make TypeScript happy
                        return (
                          <a 
                            {...props} 
                            className="blog-link" 
                            onClick={(e) => {
                              e.preventDefault();
                              if (href) {
                                const targetId = href.substring(1);
                                const targetElement = document.getElementById(targetId);
                                if (targetElement) {
                                  targetElement.scrollIntoView({ behavior: 'smooth' });
                                }
                              }
                            }}
                          >
                            {props.children || 'Jump to section'}
                          </a>
                        );
                      }
                      // Handle internal links (starting with /)
                      if (props.href?.startsWith('/')) {
                        return (
                          <Link to={props.href} className="blog-link">
                            {props.children || 'Internal link'}
                          </Link>
                        );
                      }
                      // External links open in a new tab
                      return (
                        <a {...props} className="blog-link" target="_blank" rel="noopener noreferrer">
                          {props.children || 'External link'}
                        </a>
                      );
                    },
                    h2: ({node, ...props}) => <h2 className="blog-h2" {...props}>{props.children || ''}</h2>,
                    h3: ({node, ...props}) => <h3 className="blog-h3" {...props}>{props.children || ''}</h3>,
                    ul: ({node, ...props}) => <ul className="blog-ul" {...props} />,
                    ol: ({node, ...props}) => <ol className="blog-ol" {...props} />,
                    li: ({node, ...props}) => <li className="blog-li" {...props} />,
                    p: ({node, ...props}) => <p className="blog-p" {...props} />,
                    div: ({node, ...props}) => <div {...props} />
                  }}
                >
                  {blog.content}
                </ReactMarkdown>
                
                {/* Always show CTA buttons after blog content */}
                <div className="cta-buttons">
                  <Link to="/contact" className="cta-button">
                    👉 Schedule Your Free Strategy Session Now
                  </Link>
                  <a href="tel:+254769702224" className="phone-number">
                    <span>📞 Call Us: +254 769 702 224</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="blog-share">
              <span>Share this article:</span>
              <div className="share-buttons">
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer" className="share-button twitter">
                  Twitter
                </a>
                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="share-button linkedin">
                  LinkedIn
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="share-button facebook">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div className="blog-navigation">
        <div className="container">
          <Link to="/blog" className="back-to-blog">
            ← Back to Blog
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
