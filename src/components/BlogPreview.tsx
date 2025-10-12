import React from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../data/blogs';
import BlogCard from './BlogCard';
import './BlogPreview.css';

const BlogPreview: React.FC = () => {
  // Get the 3 most recent blog posts
  const recentPosts = getBlogs().slice(0, 3);

  return (
    <section className="blog-preview">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest from Our Blog</h2>
          <p className="section-subtitle">Discover our latest insights, tutorials, and company news</p>
          <Link to="/blog" className="view-all-link">
            View All Articles →
          </Link>
        </div>
        
        <div className="blog-preview-grid">
          {recentPosts.map((post) => (
            <BlogCard key={post.id} blog={post} className="blog-preview-card" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
