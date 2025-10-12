import React from 'react';
import { Blog } from '../types/blog';
import { Link } from 'react-router-dom';

interface BlogCardProps {
  blog: Blog;
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, className = '' }) => {
  return (
    <div className={`blog-card ${className}`}>
      <div className="blog-card-inner">
        <div className="blog-image-container">
          <img 
            src={blog.image} 
            alt={blog.title} 
            className="blog-image"
            loading="lazy"
          />
          <div className="blog-category">{blog.category}</div>
        </div>
        <div className="blog-content">
          <div className="blog-meta">
            <span className="blog-date">{blog.date}</span>
            <span className="blog-read-time">{blog.readTime}</span>
          </div>
          <h3 className="blog-title">
            <Link to={`/blog/${blog.slug}`} className="blog-title-link">
              {blog.title}
            </Link>
          </h3>
          <p className="blog-excerpt">{blog.excerpt}</p>
          <div className="blog-footer">
            <div className="blog-author">By {blog.author}</div>
            <Link to={`/blog/${blog.slug}`} className="blog-read-more">
              Read More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
