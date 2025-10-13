import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { getBlogs } from '../data/blogs';
import './BlogPage.css';

const BLOGS_PER_PAGE = 6;

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const allBlogs = getBlogs();
  const totalPages = Math.ceil(allBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = allBlogs.slice(0, currentPage * BLOGS_PER_PAGE);
  const hasMore = currentPage < totalPages;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredPost = allBlogs[0];
  // otherPosts can be uncommented and used when needed
  // const otherPosts = allBlogs.slice(1);

  const loadMore = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  return (
    <main className="main-content">
      <div className="blog-page">
        <section className="blog-hero">
        <div className="container">
          <h1 className="blog-page-title">Our Blog</h1>
          <p className="blog-page-subtitle">Latest news, insights and updates from our team</p>
        </div>
      </section>

      <section className="featured-blog">
        <div className="container">
          <h2 className="section-title">Featured Post</h2>
          {featuredPost && (
            <div className="featured-blog-card">
              <div className="featured-blog-image">
                <img src={featuredPost.image} alt={featuredPost.title} />
              </div>
              <div className="featured-blog-content">
                <div className="blog-meta">
                  <span className="blog-category">{featuredPost.category}</span>
                  <span className="blog-date">{featuredPost.date}</span>
                  <span className="blog-read-time">{featuredPost.readTime}</span>
                </div>
                <h2 className="featured-blog-title">
                  <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>
                <p className="featured-blog-excerpt">{featuredPost.excerpt}</p>
                <Link to={`/blog/${featuredPost.slug}`} className="read-more-btn">
                  Read Full Story →
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="blog-list">
        <div className="container">
          <h2 className="section-title">Latest Posts</h2>
          <div className="blog-grid">
            {paginatedBlogs.map(blog => (
              <BlogCard key={blog.id} blog={blog} className="blog-grid-item" />
            ))}
          </div>
          
          {hasMore && (
            <div className="load-more-container">
              <button onClick={loadMore} className="load-more-btn">
                Load More Articles
              </button>
            </div>
          )}
        </div>
      </section>
      </div>
    </main>
  );
};

export default BlogPage;
